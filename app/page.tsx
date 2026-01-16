'use client';

import Link from 'next/link';
import { trackButtonClick, trackEvent } from './lib/gtm';

export default function Home() {
  const handleSimpleClick = () => {
    trackButtonClick('simple_test_button', {
      timestamp: new Date().toISOString(),
    });
  };

  const handleCustomEvent = () => {
    trackEvent('custom_test_event', {
      category: 'test',
      action: 'click',
      label: 'custom event test',
      value: 1,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            GTM & GA4 動作検証プロジェクト
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            Google Tag Manager と Google Analytics 4 の統合テスト
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
              イベント送信テスト
            </h2>

            <div className="space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-200">
                  ボタンクリックイベント
                </h3>
                <button
                  onClick={handleSimpleClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  シンプルなクリックイベントを送信
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  イベント名: button_click
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-200">
                  カスタムイベント
                </h3>
                <button
                  onClick={handleCustomEvent}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  カスタムイベントを送信
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  イベント名: custom_test_event
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-200">
                  ページ遷移テスト
                </h3>
                <div className="flex gap-4 flex-wrap">
                  <Link
                    href="/test-page"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-block"
                  >
                    テストページへ移動
                  </Link>
                  <Link
                    href="/form-test"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-block"
                  >
                    フォームテストページへ移動
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-yellow-900 dark:text-yellow-200">
              セットアップ方法
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>.env.local ファイルに GTM ID を設定してください</li>
              <li>ブラウザの開発者ツールでコンソールを開きます</li>
              <li>ボタンをクリックすると、GTM イベントの詳細がコンソールに表示されます</li>
              <li>GTM のプレビューモードで dataLayer を確認できます</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
