// GTM用のdataLayerの型定義
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

// GTMイベントのインターフェース
export interface GTMEvent {
  event: string;
  [key: string]: any;
}

// dataLayerにイベントを送信
export const pushToDataLayer = (data: GTMEvent): void => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data);
    console.log('GTM Event pushed:', data);
  } else {
    console.warn('dataLayer is not available');
  }
};

// ページビュー イベント
export const trackPageView = (url: string): void => {
  pushToDataLayer({
    event: 'page_view',
    page_path: url,
  });
};

// カスタムイベント
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
): void => {
  pushToDataLayer({
    event: eventName,
    ...eventParams,
  });
};

// ボタンクリック イベント
export const trackButtonClick = (buttonName: string, additionalData?: Record<string, any>): void => {
  pushToDataLayer({
    event: 'button_click',
    button_name: buttonName,
    ...additionalData,
  });
};

// フォーム送信 イベント
export const trackFormSubmit = (formName: string, additionalData?: Record<string, any>): void => {
  pushToDataLayer({
    event: 'form_submit',
    form_name: formName,
    ...additionalData,
  });
};

// 商品クリック イベント（EC用）
export const trackProductClick = (product: {
  id: string;
  name: string;
  price?: number;
  category?: string;
}): void => {
  pushToDataLayer({
    event: 'select_item',
    ecommerce: {
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          item_category: product.category,
        },
      ],
    },
  });
};

// ユーザーID設定
export const setUserId = (userId: string): void => {
  pushToDataLayer({
    event: 'set_user_id',
    user_id: userId,
  });
};
