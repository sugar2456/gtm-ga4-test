'use client';

import Link from 'next/link';
import { useState, FormEvent, useEffect } from 'react';
import { trackPageView, trackFormSubmit, trackEvent } from '../lib/gtm';

export default function FormTestPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    trackPageView('/form-test');
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    trackFormSubmit('contact_form', {
      form_fields: {
        name: formData.name ? 'filled' : 'empty',
        email: formData.email ? 'filled' : 'empty',
        message: formData.message ? 'filled' : 'empty',
      },
      timestamp: new Date().toISOString(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleInputFocus = (fieldName: string) => {
    trackEvent('form_field_focus', {
      field_name: fieldName,
      form_name: 'contact_form',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            フォームテスト
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            フォーム操作のトラッキングテスト
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
              お問い合わせフォーム
            </h2>

            {submitted && (
              <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-6">
                フォームが送信されました!（GTMイベントを確認してください）
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  お名前
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => handleInputFocus('name')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="山田太郎"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  メールアドレス
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => handleInputFocus('email')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="example@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  メッセージ
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => handleInputFocus('message')}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="お問い合わせ内容をご記入ください"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                送信する
              </button>
            </form>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-200">
              トラッキングされるイベント
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>ページビュー: page_view</li>
              <li>フォームフィールドのフォーカス: form_field_focus</li>
              <li>フォーム送信: form_submit</li>
            </ul>
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
