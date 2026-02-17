/**
 * Cell Battle - Local Storage Adapter
 * 
 * Supabaseを使わずlocalStorageのみで動作するバージョン。
 * オンライン対戦は同一ブラウザのタブ間で動作します（同一マシン内）。
 * Wi-Fi不要でlocalhost:3000で完全に遊べます。
 */

export const storage = {
  async get(key, _shared) {
    try {
      const v = localStorage.getItem(key);
      if (v === null) return null;
      return { key, value: v };
    } catch (e) {
      console.warn("[storage] get error:", e);
      return null;
    }
  },

  async set(key, value, _shared) {
    try {
      localStorage.setItem(key, value);
      return { key, value };
    } catch (e) {
      console.warn("[storage] set error:", e);
      return null;
    }
  },

  async delete(key, _shared) {
    try {
      localStorage.removeItem(key);
      return { key, deleted: true };
    } catch (e) {
      console.warn("[storage] delete error:", e);
      return null;
    }
  },

  async list(prefix, _shared) {
    try {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(prefix)) keys.push(k);
      }
      return { keys };
    } catch (e) {
      console.warn("[storage] list error:", e);
      return { keys: [] };
    }
  },
};

export function cleanupOldEntries() {
  try {
    const now = Date.now();
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (!k) continue;
      /* PvP queue entries older than 30 seconds */
      if (k.startsWith("pvp:q:")) {
        try {
          const v = JSON.parse(localStorage.getItem(k));
          if (v?.ts && now - v.ts > 30000) localStorage.removeItem(k);
        } catch (e) { localStorage.removeItem(k); }
      }
      /* Match entries older than 2 hours */
      if (k.startsWith("pvp:m:")) {
        try {
          const v = JSON.parse(localStorage.getItem(k));
          if (v?.ts && now - v.ts > 7200000) localStorage.removeItem(k);
        } catch (e) { localStorage.removeItem(k); }
      }
      /* Heartbeat entries older than 30 seconds */
      if (k.startsWith("pvp:hb:")) {
        try {
          const t = Number(localStorage.getItem(k));
          if (t && now - t > 30000) localStorage.removeItem(k);
        } catch (e) { localStorage.removeItem(k); }
      }
    }
  } catch (e) {}
}
