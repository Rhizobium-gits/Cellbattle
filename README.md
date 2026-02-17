# 🧬 Cell Battle - タンパク質カードバトル

122種のタンパク質カードで戦うオンラインカードゲーム。
結合シナジー・エネルギーシステム・サポートスペルなどのメカニクスを搭載。

## 🚀 セットアップ手順（所要時間：約30分）

### 前提条件
- **Node.js** (v18以上): https://nodejs.org
- **Git**: https://git-scm.com
- **GitHubアカウント**: https://github.com
- **Supabaseアカウント**: https://supabase.com （無料）
- **Vercelアカウント**: https://vercel.com （無料、GitHubでログイン）

---

### Step 1: Supabase プロジェクト作成

1. https://supabase.com にログイン
2. 「New Project」をクリック
3. プロジェクト名: `cell-battle`
4. パスワード: 適当に設定（メモしておく）
5. リージョン: `Northeast Asia (Tokyo)` を選択
6. 「Create new project」→ 2分ほど待つ

### Step 2: データベーステーブル作成

1. Supabase Dashboard → 左メニュー「SQL Editor」
2. 「New query」をクリック
3. `setup.sql` の中身を全部コピペ
4. 「Run」をクリック → "Success" と表示されればOK

### Step 3: APIキーを取得

1. Supabase Dashboard → 左メニュー「Settings」→「API」
2. 以下の2つをメモ：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon (public) key**: `eyJhbGci...` で始まる長い文字列

### Step 4: ローカル環境セットアップ

```bash
# このフォルダに移動
cd cell-battle

# パッケージインストール
npm install

# 環境変数ファイル作成
cp .env.local.example .env.local
```

`.env.local` を開いて、Step 3でメモした値を貼り付け：
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...（長い文字列）
```

### Step 5: ローカルで動作確認

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開く。

**テスト方法：**
- **AI対戦**: 難易度ボタン（やさしい/ふつう/つよい）をクリック
- **オンライン対戦**: 「🌐 オンライン対戦」→「対戦する！」
  - 2つのブラウザタブで同時に操作するとマッチング
  - 1人の場合は15秒後にAI対戦にフォールバック

### Step 6: GitHubにアップロード

```bash
git init
git add .
git commit -m "Cell Battle v1.0"
```

GitHub.com で新しいリポジトリ `cell-battle` を作成（Private推奨）。
表示されるコマンドに従ってpush：

```bash
git remote add origin https://github.com/あなたのユーザー名/cell-battle.git
git branch -M main
git push -u origin main
```

### Step 7: Vercelにデプロイ

1. https://vercel.com にGitHubでログイン
2. 「Import Project」→ `cell-battle` リポジトリを選択
3. **Environment Variables** に以下を追加：
   - `NEXT_PUBLIC_SUPABASE_URL` → Step 3のURL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Step 3のキー
4. 「Deploy」をクリック
5. 1-2分で完了 → `cell-battle-xxx.vercel.app` のようなURLが発行される

### Step 8: PWAアイコン作成（任意）

`public/` に以下のアイコンファイルを追加すると、スマホのホーム画面にアプリアイコンが表示される：
- `icon-192.png` (192×192px)
- `icon-512.png` (512×512px)

🧬マークなどを描いたPNGを置くだけでOK。

---

## 📁 ファイル構成

```
cell-battle/
├── app/
│   ├── layout.jsx      # レイアウト（PWAメタタグ）
│   └── page.jsx        # ゲーム本体（1440行）
├── lib/
│   └── storage.js      # ストレージアダプター
├── public/
│   └── manifest.json   # PWAマニフェスト
├── .env.local.example  # 環境変数テンプレート
├── setup.sql           # Supabaseテーブル作成SQL
├── package.json
├── next.config.js
├── jsconfig.json
└── README.md           # このファイル
```

## 🔧 技術スタック

| 技術 | 役割 | 費用 |
|------|------|------|
| Next.js | フロントエンド | 無料 |
| Vercel | ホスティング | 無料 |
| Supabase | オンライン対戦DB | 無料（月500MB） |
| localStorage | アカウント保存 | 無料 |

**月額費用: ¥0**（数百人規模まで）

## 🎮 ゲーム機能

- 122種のタンパク質カード（シグナル/構造/酵素/受容体 等15カテゴリ）
- ドラッグ&ドロップで場にカード配置
- 結合シナジーシステム（攻撃力ボーナス）
- 5種のエネルギー（グルコース/ATP/Ca²⁺/電気信号/GTP）
- 9種のサポートスペル（即時発動）
- ★1-5 レアリティシステム
- アカウント・ランク・コイン・アバターショップ
- AI対戦（3段階難易度）
- オンラインPvP対戦（マッチメイキング付き）

## ⚡ 今後の改善案

- **Supabase Realtime**: ポーリング(1.2秒)をWebSocket通知に変更 → 即時反映
- **ランキング**: Supabaseにleaderboardテーブルを追加
- **カスタムドメイン**: Vercelで独自ドメイン設定（.comなど）
- **React Native版**: Expoで iOS/Android ネイティブアプリ化
