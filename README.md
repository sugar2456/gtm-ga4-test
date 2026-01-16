# GTM & GA4 動作検証プロジェクト

Google Tag Manager (GTM) と Google Analytics 4 (GA4) の統合テスト用の Next.js プロジェクトです。

## 機能

- Next.js 公式の `@next/third-parties` パッケージを使用した GTM 統合
- カスタムイベントの送信
- ページビューのトラッキング
- ボタンクリックイベント
- フォーム送信イベント
- フォームフィールドのフォーカスイベント
- 複数のテストページ

## セットアップ方法

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルを作成し、GTM ID を設定します：

```bash
cp .env.local.example .env.local
```

`.env.local` ファイルを編集：

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

**GTM ID の取得方法：**
1. [Google Tag Manager](https://tagmanager.google.com/) にログイン
2. 新しいコンテナを作成（まだない場合）
3. コンテナ ID（GTM-XXXXXXX）をコピー

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## GTM の設定

### 1. GTM でタグを設定

GTM の管理画面で以下のタグを作成します：

#### GA4 設定タグ
1. 「タグ」→「新規」をクリック
2. タグタイプ：「Google アナリティクス: GA4 設定」を選択
3. 測定 ID：`G-XXXXXXXXXX` を入力
4. トリガー：「All Pages」を選択

#### カスタムイベントタグ（例：button_click）
1. 「タグ」→「新規」をクリック
2. タグタイプ：「Google アナリティクス: GA4 イベント」を選択
3. 設定タグ：上で作成した GA4 設定タグを選択
4. イベント名：`{{Event}}` または `button_click`
5. トリガー：カスタムイベント「button_click」を作成

### 2. トリガーの設定

カスタムイベントトリガーを作成：
1. 「トリガー」→「新規」をクリック
2. トリガータイプ：「カスタム イベント」
3. イベント名：`button_click`（または他のイベント名）

### 3. プレビューモードで確認

1. GTM の「プレビュー」ボタンをクリック
2. テストサイトの URL を入力
3. dataLayer にイベントが送信されていることを確認

## 技術スタック

このプロジェクトは以下の技術を使用しています：

- **Next.js 16** - React フレームワーク
- **@next/third-parties** - Next.js 公式の GTM/GA4 統合パッケージ
- **TypeScript** - 型安全な開発
- **Tailwind CSS 4** - スタイリング

## プロジェクト構成

```
gtm-ga4-test/
├── app/
│   ├── lib/
│   │   └── gtm.ts                      # GTM イベント送信関数
│   ├── test-page/
│   │   └── page.tsx                    # テストページ
│   ├── form-test/
│   │   └── page.tsx                    # フォームテストページ
│   ├── layout.tsx                      # ルートレイアウト（@next/third-parties で GTM 統合）
│   └── page.tsx                        # ホームページ
├── .env.local.example                  # 環境変数のサンプル
└── README.md
```

## @next/third-parties について

このプロジェクトは Next.js 公式の `@next/third-parties` パッケージを使用しています。

**メリット:**
- Next.js チームによる最適化済み
- パフォーマンス向上（Partytown との統合）
- 自動的な Script 最適化
- TypeScript サポート
- シンプルな実装

**使用方法:**

```tsx
import { GoogleTagManager } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleTagManager gtmId="GTM-XXXXXXX" />
    </html>
  );
}
```

## イベント一覧

このプロジェクトで実装されているイベント：

| イベント名 | 説明 | パラメータ |
|-----------|------|-----------|
| `page_view` | ページビュー | `page_path` |
| `button_click` | ボタンクリック | `button_name`, 追加データ |
| `form_submit` | フォーム送信 | `form_name`, `form_fields` |
| `form_field_focus` | フォームフィールドのフォーカス | `field_name`, `form_name` |
| `custom_test_event` | カスタムテストイベント | `category`, `action`, `label`, `value` |

## イベント送信のテスト方法

### 1. ブラウザの開発者ツールを開く

Chrome: `F12` または `Cmd+Option+I` (Mac)

### 2. コンソールを確認

イベントが送信されると、コンソールに以下のように表示されます：

```
GTM Event pushed: {event: 'button_click', button_name: 'simple_test_button', timestamp: '2024-01-16T...'}
```

### 3. GTM プレビューモードで確認

1. GTM の管理画面で「プレビュー」をクリック
2. テストサイトにアクセス
3. タグアシスタントで dataLayer を確認

### 4. GA4 でリアルタイムレポートを確認

1. [Google Analytics](https://analytics.google.com/) にログイン
2. 「リアルタイム」レポートを開く
3. イベントが記録されているか確認

## カスタムイベントの追加方法

`app/lib/gtm.ts` にイベント送信関数を追加できます：

```typescript
export const trackCustomEvent = (data: any): void => {
  pushToDataLayer({
    event: 'your_custom_event',
    ...data,
  });
};
```

使用例：

```typescript
import { trackCustomEvent } from './lib/gtm';

trackCustomEvent({
  category: 'engagement',
  action: 'video_play',
  label: 'intro_video',
});
```

## トラブルシューティング

### dataLayer が undefined

- GTM ID が正しく設定されているか確認
- ページが完全に読み込まれているか確認
- ブラウザのコンソールでエラーがないか確認

### イベントが GA4 に表示されない

- GTM でタグが正しく設定されているか確認
- GTM のプレビューモードでタグが発火しているか確認
- GA4 の測定 ID が正しいか確認
- リアルタイムレポートには最大 30 秒の遅延がある

### Node.js のバージョン警告

Next.js 16.1.2 は Node.js 20.9.0 以上が必要です。Node.js をアップデートすることをお勧めします：

```bash
nvm install 20
nvm use 20
```

## 参考リンク

- [@next/third-parties Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries)
- [Google Tag Manager](https://tagmanager.google.com/)
- [Google Analytics 4](https://analytics.google.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [GTM Developer Guide](https://developers.google.com/tag-manager)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/events)
