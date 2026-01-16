'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { trackPageView, trackButtonClick } from '../lib/gtm';

export default function TestPage() {
  useEffect(() => {
    trackPageView('/test-page');
  }, []);

  const handleClick = (buttonName: string) => {
    trackButtonClick(buttonName, {
      page: 'test-page',
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            テストページ
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            ページビューとイベント送信のテスト
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
              このページで検証できること
            </h2>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span className="text-gray-700 dark:text-gray-300">
                  ページ遷移時の page_view イベントの送信
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span className="text-gray-700 dark:text-gray-300">
                  異なるページでのボタンクリックイベント
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span className="text-gray-700 dark:text-gray-300">
                  dataLayer への複数イベントの追加
                </span>
              </li>
            </ul>

            <div className="space-y-4">
              <button
                onClick={() => handleClick('test_button_1')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                テストボタン 1
              </button>

              <button
                onClick={() => handleClick('test_button_2')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                テストボタン 2
              </button>

              <button
                onClick={() => handleClick('test_button_3')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                テストボタン 3
              </button>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
