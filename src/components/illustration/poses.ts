import type { Pose } from "@/lib/types";

export interface Pt {
  x: number;
  y: number;
}

export interface BodyLayout {
  head: Pt;
  neck: Pt;
  hip: Pt;
  elbowL: Pt;
  handL: Pt;
  elbowR: Pt;
  handR: Pt;
  kneeL: Pt;
  footL: Pt;
  kneeR: Pt;
  footR: Pt;
  shoulderL: Pt;
  shoulderR: Pt;
  groundY: number;
  chair?: { x: number; y: number; w: number; h: number };
  wall?: boolean;
  support?: boolean;
}

const g = 268;

function body(partial: Omit<BodyLayout, "groundY" | "shoulderL" | "shoulderR"> & Partial<Pick<BodyLayout, "shoulderL" | "shoulderR" | "groundY">>): BodyLayout {
  return {
    groundY: g,
    shoulderL: { x: partial.neck.x - 16, y: partial.neck.y + 14 },
    shoulderR: { x: partial.neck.x + 16, y: partial.neck.y + 14 },
    ...partial,
  };
}

export function layoutPose(pose: Pose): BodyLayout {
  switch (pose) {
    case "stand":
    case "breath":
    case "breathHold":
      return body({
        head: { x: 120, y: 48 },
        neck: { x: 120, y: 70 },
        hip: { x: 120, y: 152 },
        elbowL: { x: 92, y: 118 },
        handL: { x: 100, y: 148 },
        elbowR: { x: 148, y: 118 },
        handR: { x: 140, y: 148 },
        kneeL: { x: 106, y: 204 },
        footL: { x: 98, y: 262 },
        kneeR: { x: 134, y: 204 },
        footR: { x: 142, y: 262 },
      });
    case "armRaise":
    case "forcedReach":
      return body({
        head: { x: pose === "forcedReach" ? 128 : 120, y: pose === "forcedReach" ? 64 : 56 },
        neck: { x: 120, y: 78 },
        hip: { x: 120, y: 156 },
        elbowL: { x: 102, y: pose === "forcedReach" ? 42 : 58 },
        handL: { x: 96, y: pose === "forcedReach" ? 18 : 30 },
        elbowR: { x: 138, y: pose === "forcedReach" ? 42 : 58 },
        handR: { x: 144, y: pose === "forcedReach" ? 18 : 30 },
        kneeL: { x: 106, y: 206 },
        footL: { x: 98, y: 262 },
        kneeR: { x: 134, y: 206 },
        footR: { x: 142, y: 262 },
      });
    case "forwardFold":
      return body({
        head: { x: 118, y: 168 },
        neck: { x: 120, y: 146 },
        hip: { x: 120, y: 118 },
        elbowL: { x: 100, y: 176 },
        handL: { x: 96, y: 206 },
        elbowR: { x: 136, y: 176 },
        handR: { x: 140, y: 206 },
        kneeL: { x: 108, y: 186 },
        footL: { x: 100, y: 262 },
        kneeR: { x: 136, y: 186 },
        footR: { x: 148, y: 262 },
      });
    case "roundedBack":
      return body({
        head: { x: 168, y: 210 },
        neck: { x: 156, y: 188 },
        hip: { x: 112, y: 132 },
        elbowL: { x: 150, y: 214 },
        handL: { x: 146, y: 240 },
        elbowR: { x: 176, y: 206 },
        handR: { x: 184, y: 232 },
        kneeL: { x: 108, y: 196 },
        footL: { x: 100, y: 262 },
        kneeR: { x: 140, y: 198 },
        footR: { x: 156, y: 262 },
      });
    case "partialSquat":
      return body({
        head: { x: 120, y: 78 },
        neck: { x: 120, y: 100 },
        hip: { x: 120, y: 168 },
        elbowL: { x: 86, y: 124 },
        handL: { x: 64, y: 132 },
        elbowR: { x: 154, y: 124 },
        handR: { x: 176, y: 132 },
        kneeL: { x: 84, y: 196 },
        footL: { x: 76, y: 262 },
        kneeR: { x: 156, y: 196 },
        footR: { x: 164, y: 262 },
      });
    case "baithak":
      return body({
        head: { x: 120, y: 96 },
        neck: { x: 120, y: 118 },
        hip: { x: 120, y: 188 },
        elbowL: { x: 78, y: 150 },
        handL: { x: 56, y: 164 },
        elbowR: { x: 162, y: 150 },
        handR: { x: 184, y: 164 },
        kneeL: { x: 68, y: 188 },
        footL: { x: 58, y: 262 },
        kneeR: { x: 172, y: 188 },
        footR: { x: 182, y: 262 },
      });
    case "kneesIn":
      return body({
        head: { x: 120, y: 84 },
        neck: { x: 120, y: 106 },
        hip: { x: 120, y: 176 },
        elbowL: { x: 90, y: 136 },
        handL: { x: 72, y: 150 },
        elbowR: { x: 150, y: 136 },
        handR: { x: 168, y: 150 },
        kneeL: { x: 112, y: 200 },
        footL: { x: 78, y: 262 },
        kneeR: { x: 128, y: 200 },
        footR: { x: 168, y: 262 },
      });
    case "chairSit":
    case "ankle":
      return body({
        head: { x: 108, y: 74 },
        neck: { x: 108, y: 96 },
        hip: { x: 112, y: 164 },
        elbowL: { x: 86, y: 132 },
        handL: { x: 96, y: 158 },
        elbowR: { x: 132, y: 130 },
        handR: { x: 148, y: 156 },
        kneeL: { x: 158, y: 168 },
        footL: { x: 162, y: pose === "ankle" ? 236 : 262 },
        kneeR: { x: 150, y: 176 },
        footR: { x: 154, y: 262 },
        chair: { x: 70, y: 158, w: 78, h: 90 },
      });
    case "chairRise":
      return body({
        head: { x: 124, y: 62 },
        neck: { x: 118, y: 84 },
        hip: { x: 112, y: 140 },
        elbowL: { x: 96, y: 118 },
        handL: { x: 88, y: 150 },
        elbowR: { x: 142, y: 116 },
        handR: { x: 156, y: 146 },
        kneeL: { x: 156, y: 186 },
        footL: { x: 158, y: 262 },
        kneeR: { x: 148, y: 192 },
        footR: { x: 150, y: 262 },
        chair: { x: 64, y: 168, w: 78, h: 90 },
      });
    case "wallDand":
      return body({
        head: { x: 86, y: 118 },
        neck: { x: 100, y: 128 },
        hip: { x: 150, y: 156 },
        elbowL: { x: 62, y: 140 },
        handL: { x: 42, y: 150 },
        elbowR: { x: 66, y: 156 },
        handR: { x: 44, y: 168 },
        kneeL: { x: 176, y: 188 },
        footL: { x: 196, y: 262 },
        kneeR: { x: 168, y: 196 },
        footR: { x: 186, y: 262 },
        wall: true,
      });
    case "dand":
    case "downDog":
      return body({
        head: { x: 58, y: 168 },
        neck: { x: 74, y: 156 },
        hip: { x: 124, y: 108 },
        elbowL: { x: 52, y: 196 },
        handL: { x: 44, y: 232 },
        elbowR: { x: 70, y: 190 },
        handR: { x: 62, y: 228 },
        kneeL: { x: 168, y: 168 },
        footL: { x: 198, y: 236 },
        kneeR: { x: 160, y: 176 },
        footR: { x: 190, y: 242 },
      });
    case "dandLow":
      return body({
        head: { x: 78, y: 186 },
        neck: { x: 96, y: 196 },
        hip: { x: 146, y: 208 },
        elbowL: { x: 58, y: 214 },
        handL: { x: 48, y: 236 },
        elbowR: { x: 74, y: 214 },
        handR: { x: 64, y: 236 },
        kneeL: { x: 176, y: 214 },
        footL: { x: 204, y: 236 },
        kneeR: { x: 168, y: 220 },
        footR: { x: 196, y: 242 },
      });
    case "kneel":
      return body({
        head: { x: 120, y: 78 },
        neck: { x: 120, y: 100 },
        hip: { x: 120, y: 176 },
        elbowL: { x: 96, y: 140 },
        handL: { x: 90, y: 172 },
        elbowR: { x: 144, y: 140 },
        handR: { x: 150, y: 172 },
        kneeL: { x: 104, y: 236 },
        footL: { x: 88, y: 250 },
        kneeR: { x: 140, y: 236 },
        footR: { x: 156, y: 250 },
      });
    case "lunge":
      return body({
        head: { x: 132, y: 64 },
        neck: { x: 128, y: 86 },
        hip: { x: 118, y: 158 },
        elbowL: { x: 108, y: 120 },
        handL: { x: 100, y: 150 },
        elbowR: { x: 150, y: 118 },
        handR: { x: 162, y: 146 },
        kneeL: { x: 168, y: 196 },
        footL: { x: 176, y: 262 },
        kneeR: { x: 72, y: 214 },
        footR: { x: 48, y: 262 },
      });
    case "cobra":
      return body({
        head: { x: 186, y: 150 },
        neck: { x: 166, y: 168 },
        hip: { x: 96, y: 214 },
        elbowL: { x: 150, y: 196 },
        handL: { x: 142, y: 228 },
        elbowR: { x: 138, y: 206 },
        handR: { x: 130, y: 232 },
        kneeL: { x: 62, y: 222 },
        footL: { x: 36, y: 228 },
        kneeR: { x: 70, y: 228 },
        footR: { x: 42, y: 236 },
      });
    case "child":
      return body({
        head: { x: 196, y: 214 },
        neck: { x: 176, y: 210 },
        hip: { x: 112, y: 176 },
        elbowL: { x: 186, y: 214 },
        handL: { x: 214, y: 220 },
        elbowR: { x: 180, y: 224 },
        handR: { x: 208, y: 230 },
        kneeL: { x: 86, y: 228 },
        footL: { x: 64, y: 236 },
        kneeR: { x: 96, y: 234 },
        footR: { x: 74, y: 244 },
      });
    case "cat":
      return body({
        head: { x: 58, y: 176 },
        neck: { x: 78, y: 158 },
        hip: { x: 168, y: 150 },
        elbowL: { x: 62, y: 196 },
        handL: { x: 52, y: 232 },
        elbowR: { x: 78, y: 198 },
        handR: { x: 70, y: 232 },
        kneeL: { x: 176, y: 196 },
        footL: { x: 196, y: 236 },
        kneeR: { x: 166, y: 204 },
        footR: { x: 186, y: 240 },
      });
    case "cow":
    case "birdDog":
      return body({
        head: { x: pose === "birdDog" ? 46 : 62, y: pose === "birdDog" ? 150 : 158 },
        neck: { x: 86, y: pose === "cow" ? 186 : 168 },
        hip: { x: 160, y: pose === "cow" ? 188 : 172 },
        elbowL: { x: pose === "birdDog" ? 36 : 70, y: pose === "birdDog" ? 150 : 204 },
        handL: { x: pose === "birdDog" ? 18 : 58, y: pose === "birdDog" ? 150 : 234 },
        elbowR: { x: 78, y: 200 },
        handR: { x: 70, y: 234 },
        kneeL: { x: 176, y: 200 },
        footL: { x: pose === "birdDog" ? 214 : 198, y: pose === "birdDog" ? 156 : 236 },
        kneeR: { x: 168, y: 208 },
        footR: { x: 190, y: 240 },
      });
    case "bridge":
      return body({
        head: { x: 196, y: 214 },
        neck: { x: 176, y: 220 },
        hip: { x: 118, y: 156 },
        elbowL: { x: 168, y: 228 },
        handL: { x: 150, y: 236 },
        elbowR: { x: 186, y: 232 },
        handR: { x: 176, y: 244 },
        kneeL: { x: 78, y: 176 },
        footL: { x: 62, y: 248 },
        kneeR: { x: 92, y: 184 },
        footR: { x: 78, y: 252 },
      });
    case "tree":
      return body({
        head: { x: 120, y: 46 },
        neck: { x: 120, y: 68 },
        hip: { x: 120, y: 150 },
        elbowL: { x: 104, y: 96 },
        handL: { x: 116, y: 112 },
        elbowR: { x: 136, y: 96 },
        handR: { x: 124, y: 112 },
        kneeL: { x: 112, y: 204 },
        footL: { x: 108, y: 262 },
        kneeR: { x: 156, y: 168 },
        footR: { x: 122, y: 196 },
        support: true,
      });
    case "triangle":
      return body({
        head: { x: 72, y: 148 },
        neck: { x: 88, y: 142 },
        hip: { x: 128, y: 168 },
        elbowL: { x: 64, y: 176 },
        handL: { x: 52, y: 206 },
        elbowR: { x: 112, y: 112 },
        handR: { x: 124, y: 78 },
        kneeL: { x: 78, y: 214 },
        footL: { x: 48, y: 262 },
        kneeR: { x: 168, y: 210 },
        footR: { x: 196, y: 262 },
      });
    case "march":
    case "rush":
    case "kneeRaise":
      return body({
        head: { x: 116, y: 48 },
        neck: { x: 116, y: 70 },
        hip: { x: 116, y: 150 },
        elbowL: { x: 90, y: 108 },
        handL: { x: 82, y: 86 },
        elbowR: { x: 142, y: 124 },
        handR: { x: 150, y: 156 },
        kneeL: { x: 104, y: 204 },
        footL: { x: 98, y: 262 },
        kneeR: { x: 156, y: pose === "kneeRaise" ? 168 : 132 },
        footR: { x: 162, y: pose === "kneeRaise" ? 198 : 156 },
      });
    case "tandem":
      return body({
        head: { x: 120, y: 48 },
        neck: { x: 120, y: 70 },
        hip: { x: 120, y: 150 },
        elbowL: { x: 78, y: 112 },
        handL: { x: 56, y: 108 },
        elbowR: { x: 162, y: 112 },
        handR: { x: 184, y: 108 },
        kneeL: { x: 108, y: 204 },
        footL: { x: 96, y: 262 },
        kneeR: { x: 136, y: 204 },
        footR: { x: 150, y: 262 },
        support: true,
      });
    case "singleLeg":
      return body({
        head: { x: 124, y: 48 },
        neck: { x: 122, y: 70 },
        hip: { x: 120, y: 150 },
        elbowL: { x: 86, y: 110 },
        handL: { x: 62, y: 104 },
        elbowR: { x: 150, y: 112 },
        handR: { x: 168, y: 128 },
        kneeL: { x: 112, y: 204 },
        footL: { x: 108, y: 262 },
        kneeR: { x: 158, y: 186 },
        footR: { x: 168, y: 220 },
        support: true,
      });
    case "sideBend":
      return body({
        head: { x: 146, y: 62 },
        neck: { x: 136, y: 82 },
        hip: { x: 120, y: 156 },
        elbowL: { x: 100, y: 130 },
        handL: { x: 92, y: 168 },
        elbowR: { x: 156, y: 52 },
        handR: { x: 168, y: 28 },
        kneeL: { x: 106, y: 206 },
        footL: { x: 98, y: 262 },
        kneeR: { x: 138, y: 206 },
        footR: { x: 150, y: 262 },
      });
    case "calf":
      return body({
        head: { x: 120, y: 36 },
        neck: { x: 120, y: 58 },
        hip: { x: 120, y: 140 },
        elbowL: { x: 96, y: 100 },
        handL: { x: 90, y: 132 },
        elbowR: { x: 144, y: 100 },
        handR: { x: 150, y: 132 },
        kneeL: { x: 108, y: 190 },
        footL: { x: 102, y: 246 },
        kneeR: { x: 134, y: 190 },
        footR: { x: 140, y: 246 },
      });
    case "walk":
      return body({
        head: { x: 118, y: 48 },
        neck: { x: 116, y: 70 },
        hip: { x: 114, y: 150 },
        elbowL: { x: 92, y: 100 },
        handL: { x: 84, y: 78 },
        elbowR: { x: 142, y: 128 },
        handR: { x: 152, y: 162 },
        kneeL: { x: 92, y: 200 },
        footL: { x: 70, y: 262 },
        kneeR: { x: 150, y: 186 },
        footR: { x: 176, y: 230 },
      });
    case "floorSit":
      return body({
        head: { x: 120, y: 86 },
        neck: { x: 120, y: 108 },
        hip: { x: 120, y: 176 },
        elbowL: { x: 92, y: 146 },
        handL: { x: 86, y: 176 },
        elbowR: { x: 148, y: 146 },
        handR: { x: 154, y: 176 },
        kneeL: { x: 70, y: 214 },
        footL: { x: 108, y: 236 },
        kneeR: { x: 170, y: 214 },
        footR: { x: 136, y: 240 },
      });
    case "spinalTwist":
      return body({
        head: { x: 132, y: 50 },
        neck: { x: 124, y: 72 },
        hip: { x: 120, y: 152 },
        elbowL: { x: 78, y: 110 },
        handL: { x: 52, y: 124 },
        elbowR: { x: 168, y: 124 },
        handR: { x: 196, y: 140 },
        kneeL: { x: 106, y: 204 },
        footL: { x: 98, y: 262 },
        kneeR: { x: 136, y: 204 },
        footR: { x: 146, y: 262 },
      });
    case "shoulderOpen":
      return body({
        head: { x: 120, y: 50 },
        neck: { x: 120, y: 72 },
        hip: { x: 120, y: 152 },
        elbowL: { x: 78, y: 96 },
        handL: { x: 40, y: 100 },
        elbowR: { x: 162, y: 96 },
        handR: { x: 200, y: 100 },
        kneeL: { x: 106, y: 204 },
        footL: { x: 98, y: 262 },
        kneeR: { x: 134, y: 204 },
        footR: { x: 142, y: 262 },
      });
    case "hipOpen":
      return body({
        head: { x: 118, y: 50 },
        neck: { x: 118, y: 72 },
        hip: { x: 118, y: 154 },
        elbowL: { x: 96, y: 112 },
        handL: { x: 88, y: 142 },
        elbowR: { x: 150, y: 120 },
        handR: { x: 168, y: 146 },
        kneeL: { x: 106, y: 206 },
        footL: { x: 100, y: 262 },
        kneeR: { x: 168, y: 176 },
        footR: { x: 128, y: 196 },
        support: true,
      });
    case "neckTurn":
      return body({
        head: { x: 148, y: 50 },
        neck: { x: 120, y: 72 },
        hip: { x: 120, y: 152 },
        elbowL: { x: 94, y: 116 },
        handL: { x: 88, y: 150 },
        elbowR: { x: 146, y: 116 },
        handR: { x: 152, y: 150 },
        kneeL: { x: 106, y: 204 },
        footL: { x: 98, y: 262 },
        kneeR: { x: 134, y: 204 },
        footR: { x: 142, y: 262 },
      });
    case "wristFlex":
      return body({
        head: { x: 120, y: 50 },
        neck: { x: 120, y: 72 },
        hip: { x: 120, y: 152 },
        elbowL: { x: 96, y: 108 },
        handL: { x: 78, y: 128 },
        elbowR: { x: 144, y: 108 },
        handR: { x: 162, y: 128 },
        kneeL: { x: 106, y: 204 },
        footL: { x: 98, y: 262 },
        kneeR: { x: 134, y: 204 },
        footR: { x: 142, y: 262 },
      });
    default: {
      const _never: never = pose;
      return _never;
    }
  }
}
