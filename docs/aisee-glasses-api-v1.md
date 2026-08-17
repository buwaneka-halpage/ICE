# AISee Glasses Software — API Contract v1

Status: **draft for device integration**. Operator Portal and Tourist Companion currently render mock data that matches these shapes. Implement this contract; the portals will switch from fixtures to these endpoints.

Base URL (prod): `https://api.aisee.travel/v1`  
Live socket: `wss://live.aisee.travel/v1/device`  
Time: ISO-8601 UTC. Distances: metres. Temperature: °C. Audio: dBFS.

---

## 1. Actors and direction

| Actor | Role |
| --- | --- |
| **Glass** | Source of telemetry, SLAM pose, audio, captures, Q&A. Sink for commands. |
| **Dock / bus bay** | Reports charge state for units in the rack. |
| **Cloud** | Session, tour assignment, AR packs, alerts, media store. |
| **Operator Portal** | Reads fleet + QA + map. Sends broadcasts and policy. |
| **Companion** | Reads live context + vault. Sends language / isolation / prompts. |

Glasses never talk to the portals directly. Device ↔ Cloud only.

---

## 2. Identity

| Field | Format | Example |
| --- | --- | --- |
| `device_id` | `AS-ARIA-` + 3-digit index | `AS-ARIA-024` |
| `guest_id` | integer, tour-local | `108` |
| `tour_id` | `A` \| `B` \| `C` | `A` |
| `session_id` | `ses_` + ulid | `ses_01J…` |
| `guide_id` | slug | `chaminda-k` |
| `site_id` | slug | `sigiriya` |
| `node_id` | see enum below | `water-gardens` |
| `layer_id` | slug | `hydraulics-illusion` |

Auth:

- Glass: `Authorization: Bearer <device_jwt>` issued at dock pairing. JWT claims: `device_id`, `fleet_id`, `exp`.
- Companion: guest JWT from QR / pairing code on the glasses.
- Operator: staff JWT (out of scope for firmware).

Pairing: BLE advertisement `AISee/<device_id>`, then `POST /v1/devices/pair` with the 6-digit dock code.

---

## 3. Shared enums (must match portal)

```
device_status:   healthy | low-battery | syncing | docked | offline
mode:            visual-overlay+audio | audio-only | capture-only
language:        BCP-47  (en | de | zh-Hans | hi | fr)
node_id:         water-gardens | boulder-gardens | mirror-wall | frescoes | lion-paw | summit
layer_state:     idle | downloading | active | degraded
alert_severity:  info | warning | critical
qa_flag_kind:    missed-safety | pacing | tone | off-script
```

`low-battery` is **battery < 20**. Operator auto-swap policy fires at **15**.

Sigiriya spatial pack (current demo):

| `layer_id` | Name | `node_id` | Version |
| --- | --- | --- | --- |
| `hydraulics-illusion` | Water Gardens Hydraulic AR Illusion | `water-gardens` | `4.2.1` |
| `fresco-pigment` | Frescoes pigment reconstruction | `frescoes` | `2.8.0` |
| `summit-palace` | Summit palace ghost architecture | `summit` | `1.9.3` |
| `lion-gate-scale` | Lion Gate scale overlay | `lion-paw` | `3.0.0` |
| `mirror-wall-text` | Mirror Wall inscription translation | `mirror-wall` | `5.1.2` |

---

## 4. Live channel (glasses firmware)

Connect after pairing:

```
GET wss://live.aisee.travel/v1/device
Authorization: Bearer <device_jwt>
```

Server → device on connect: `hello`. Device → server: `telemetry` at **1 Hz** while on tour, **0.2 Hz** while docked. Server → device: `command` at any time. Device ACKs every command.

Envelope:

```json
{
  "v": 1,
  "type": "telemetry | command | ack | event | hello",
  "ts": "2026-08-16T09:47:12.441Z",
  "device_id": "AS-ARIA-024",
  "session_id": "ses_01K2SIGIRIYA024"
}
```

### 4.1 `telemetry` (device → cloud) — required 1 Hz on tour

This is what the operator rack, map, acoustic meter, and companion battery/language pills read.

```json
{
  "v": 1,
  "type": "telemetry",
  "ts": "2026-08-16T09:47:12.441Z",
  "device_id": "AS-ARIA-024",
  "session_id": "ses_01K2SIGIRIYA024",
  "payload": {
    "status": "healthy",
    "battery_pct": 82,
    "temp_c": 34.0,
    "mode": "visual-overlay+audio",
    "language": "de",
    "voice_isolation": true,
    "guest_id": 108,
    "tour_id": "A",
    "pose": {
      "lat": 7.9570,
      "lng": 80.7603,
      "alt_m": 198.4,
      "heading_deg": 18.0,
      "node_id": "water-gardens",
      "poi_id": "fountain-3",
      "slam_tracking": true,
      "metres_from_group": 4.2
    },
    "ar": {
      "layer_id": "hydraulics-illusion",
      "state": "active",
      "tracking_accuracy_pct": 98.2
    },
    "audio": {
      "guide_dbfs": -12,
      "ambient_dbfs": -6,
      "anc_db": -24,
      "wpm": 130
    }
  }
}
```

Rules:

- Omit `guest_id` / `tour_id` / `pose` when `status` is `docked`.
- Set `status: "syncing"` while a capture upload is in flight.
- If `metres_from_group >= 40`, cloud emits a wandering alert (portal amber pulse). Device does not decide the alert; it only reports distance.
- `poi_id` drives the companion “Looking at” card. Known Sigiriya POIs: `fountain-3`, `mirror-wall-verse`, `fresco-pocket`, `lion-paw`, `summit-south`.

### 4.2 `event` (device → cloud) — discrete, not 1 Hz

```json
{
  "v": 1,
  "type": "event",
  "ts": "2026-08-16T10:34:02.010Z",
  "device_id": "AS-ARIA-024",
  "session_id": "ses_01K2SIGIRIYA024",
  "payload": {
    "kind": "qa_utterance | capture | badge | safety_ack | disconnect",
    "data": {}
  }
}
```

**`qa_utterance`** — guest asked a question (companion Q&A log, operator transcript):

```json
{
  "kind": "qa_utterance",
  "data": {
    "utterance_id": "utt_7f3",
    "role": "guest",
    "lang": "de",
    "text": "Who painted the Sigiriya maidens?",
    "node_id": "frescoes"
  }
}
```

Cloud replies on the same socket with `command.kind = "qa_answer"` (see 4.3). Also persisted for `GET /companion/qa`.

**`capture`** — shutter or voice “take a photo / clip”:

```json
{
  "kind": "capture",
  "data": {
    "capture_id": "cap_vg01",
    "media": "photo | spatial-audio | video",
    "node_id": "water-gardens",
    "poi_id": "fountain-3",
    "focal_mm": 24,
    "duration_s": null
  }
}
```

Then upload bytes via REST (`POST /v1/media`). Until the upload finishes, keep `status: "syncing"` on telemetry.

**`badge`** — guest unlocked a journey badge (`Hydraulic Engineering`, `Solo Art Route`).

### 4.3 `command` (cloud → device)

Device must ACK within 2 s:

```json
{ "v": 1, "type": "ack", "command_id": "cmd_9a", "ok": true }
```

| `kind` | Who sends | Device action |
| --- | --- | --- |
| `set_language` | Companion | Switch TTS + overlay copy. Payload `{ "language": "de" }`. |
| `set_isolation` | Companion | ANC on/off. `{ "voice_isolation": true }`. |
| `set_mode` | Companion / operator | `{ "mode": "visual-overlay+audio" }`. |
| `show_poi` | Companion prompt “Show ancient water level” | Activate overlay for `poi_id`. |
| `simplify_copy` | Companion prompt | Shorter narration for current POI. |
| `qa_answer` | Cloud LLM | Speak + overlay `{ "utterance_id", "text" }`. |
| `broadcast` | Operator emergency | Play `{ "priority": "critical", "text": "…", "require_ack": true }` in guest language. Pause tour audio. |
| `qa_flag` | Operator QA | Guide earpiece only. `{ "flag_kind": "missed-safety", "note": "lion terrace edge" }`. |
| `swap_device` | Operator policy | `{ "reason": "low-battery" }` — show “return to bus bay” overlay. |
| `hold` | Operator | Freeze movement prompt. Weather/medical. |
| `end_session` | Dock / operator | Flush uploads, go `docked`. |

Broadcast example (operator “Emergency Broadcast”):

```json
{
  "v": 1,
  "type": "command",
  "command_id": "cmd_9a",
  "ts": "2026-08-16T14:32:00.000Z",
  "payload": {
    "kind": "broadcast",
    "priority": "critical",
    "text": "Hold position at current node. Storm cell west of Pidurangala — 18 min. Guides acknowledge.",
    "require_ack": true,
    "audience": "all-online"
  }
}
```

---

## 5. REST (device and companion)

All JSON. Errors:

```json
{ "error": { "code": "battery_required", "message": "battery_pct missing" } }
```

HTTP: `400` validation, `401` auth, `404` unknown id, `409` session conflict, `429` rate limit.

### 5.1 Session

**`POST /v1/sessions`** — dock or guide starts a tour assignment (cloud, not firmware). Firmware then receives `hello.session_id`.

**`GET /v1/sessions/current`** — glass, after connect.

```json
{
  "session_id": "ses_01K2SIGIRIYA024",
  "site_id": "sigiriya",
  "site_name": "Sigiriya Rock Fortress",
  "tour_id": "A",
  "guide": { "id": "chaminda-k", "display": "Chaminda K." },
  "guest_id": 108,
  "language": "de",
  "pack": {
    "id": "sigiriya-spatial",
    "layers": [
      { "layer_id": "hydraulics-illusion", "version": "4.2.1", "sha256": "…" }
    ]
  }
}
```

**`POST /v1/sessions/current/end`**

### 5.2 AR pack

**`GET /v1/packs/sigiriya-spatial`** — manifest. Device downloads layer blobs only if `sha256` differs.

**`POST /v1/packs/sync-status`** — after each layer loads:

```json
{
  "device_id": "AS-ARIA-024",
  "layer_id": "hydraulics-illusion",
  "version": "4.2.1",
  "state": "active",
  "tracking_accuracy_pct": 98.2
}
```

This feeds Operator → Content & AR Assets and the map HUD (“Water Gardens Hydraulic AR Illusion: Active (98.2%)”).

### 5.3 Media (Memory Vault)

**`POST /v1/media`** `multipart/form-data`

| Part | Type |
| --- | --- |
| `meta` | JSON `CaptureMeta` |
| `file` | jpeg / mp4 / wav (spatial) |
| `ar_file` | optional jpeg — historic reconstruction for before/after slider |

```json
{
  "capture_id": "cap_vg01",
  "device_id": "AS-ARIA-024",
  "session_id": "ses_01K2SIGIRIYA024",
  "ts": "2026-08-16T09:47:00.000Z",
  "media": "photo",
  "title": "Fountain #3 · first look",
  "node_id": "water-gardens",
  "poi_id": "fountain-3",
  "focal_mm": 24,
  "has_ar_pair": true
}
```

**`GET /v1/companion/vault?session_id=`** — companion grid.

**`POST /v1/companion/vault/export`** — `{ "format": "reel-4k" | "day-recap" }`. Returns a signed URL when ready.

### 5.4 Companion (phone talks to cloud, not to the glass, after BLE bind)

**`GET /v1/companion/live?session_id=`**

```json
{
  "site_name": "Sigiriya Rock Fortress",
  "guide_display": "Chaminda",
  "connected": true,
  "battery_pct": 82,
  "mode": "visual-overlay+audio",
  "language": "de",
  "voice_isolation": true,
  "looking_at": {
    "title": "Western Water Gardens (Fountain #3)",
    "body": "A gravity-fed fountain head. Conduits under the limestone still hold the original fall line.",
    "poi_id": "fountain-3",
    "prompts": [
      "How did the hydraulics work?",
      "Show ancient water level",
      "Simplify explanation"
    ]
  }
}
```

**`POST /v1/companion/commands`** — `{ "session_id", "kind": "set_language" | "set_isolation" | "prompt", "payload" }`. Cloud forwards as a live `command` to the glass.

Prompt mapping:

| Prompt | Command |
| --- | --- |
| How did the hydraulics work? | `qa_utterance` then `qa_answer` |
| Show ancient water level | `show_poi` + AR waterline overlay |
| Simplify explanation | `simplify_copy` |

**`GET /v1/companion/journey?session_id=`** — timeline + badges.

**`GET /v1/companion/qa?session_id=`** — accordion log `{ q, a, ts }[]`.

### 5.5 Operator reads (firmware does not call these)

Listed so device fields are sufficient:

| Portal widget | Source |
| --- | --- |
| Fleet rack 48 tiles | last telemetry per `device_id` in fleet |
| Map nodes / wandering | `pose.node_id`, `pose.metres_from_group` |
| Acoustic isolation | `audio.*` |
| Speech QA waveform + snippet | rolling `qa_utterance` where `role=guide` + `audio.wpm` |
| Incident flags | `command.qa_flag` count today |
| Language mix | `telemetry.language` histogram on online units |

Guide transcript snippet expected by the portal:

```json
{
  "role": "guide",
  "guide_id": "chaminda-k",
  "text": "These limestone conduits were engineered in the 5th century to keep the fountains pressurised without mechanical pumps."
}
```

Send as `event.kind = "qa_utterance"` with `"role": "guide"` at ~every 8–12 s of speech, or a rolling partial every 2 s (`partial: true`).

---

## 6. Dock

**`POST /v1/docks/heartbeat`** every 30 s:

```json
{
  "dock_id": "bay-1-bus-04",
  "label": "Charging Bay 1 (Bus #04)",
  "slots": [
    { "device_id": "AS-ARIA-043", "battery_pct": 98, "charging": true }
  ]
}
```

Units in a dock slot must also send telemetry `status: "docked"`.

---

## 7. Firmware obligations (acceptance)

A glass is “portal-ready” when all of the following work on the Sigiriya pack:

1. Telemetry 1 Hz with `device_id`, `battery_pct`, `temp_c`, `language`, `pose.node_id`, `ar.tracking_accuracy_pct`.
2. `metres_from_group` accurate to ±3 m so wandering alerts fire at 40 m.
3. `set_language` / `set_isolation` apply in < 500 ms and the next telemetry frame reflects them.
4. `broadcast` interrupts audio, shows overlay, ACKs, and resumes.
5. Photo + optional AR pair upload appears in companion vault with EXIF-style `device_id · time · focal_mm`.
6. Guest utterance → `qa_utterance` → spoken `qa_answer`.
7. Guide mic isolation: report `anc_db` (demo target **−24**).
8. Safety notes: if the cloud sends `qa_flag` / mandatory cues (`lion-terrace-edge`, `wasp-nesting`, `summit-wind-shear`) and the guide skip is detected on-device, emit `event.kind` with `flag_kind: "missed-safety"`.

Out of scope for firmware: HaaS ROI, ancillary revenue, staff settings UI.

---

## 8. Demo fixture (optional simulator)

To drive the existing dashboards without a live site, spoof three tours:

| Tour | Guide | Headcount | Node | Device range |
| --- | --- | --- | --- | --- |
| A | Chaminda K. | 18 | `water-gardens` | AS-ARIA-001…018 |
| B | Ruwan P. | 14 | `mirror-wall` | AS-ARIA-019…032 |
| C | Nimali S. | 9 + wanderer | `lion-paw` | AS-ARIA-033…042 |

Wanderer: `guest_id` 108, `device_id` in tour C, `node_id: "frescoes"`, `metres_from_group: 45`.  
Hero unit for companion: `AS-ARIA-024`, battery 82, 34 °C, `de`.
