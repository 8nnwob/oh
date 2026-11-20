# 字日 Words — 每日單字練習

一個輕量、免安裝的每日英文單字練習頁面。使用瀏覽器本機儲存記錄進度，透過簡單的間隔複習安排舊字與新字。

## 使用方式

直接開啟 `index.html`，或透過 GitHub Pages 發布。今天的練習會包含到期複習與最多五個新字。翻開單字卡後選「熟悉」或「再練一次」，頁面會在瀏覽器本機記錄結果。

## 發布到 GitHub Pages

1. 將此專案推送到 GitHub repository 的 `main` 或 `master` 分支。
2. 在 repository 的 **Settings → Pages → Build and deployment** 中，將 Source 設為 **GitHub Actions**。
3. 每次推送到上述分支，`.github/workflows/pages.yml` 會自動部署網站；也能從 Actions 頁面手動執行。

學習資料存在目前瀏覽器的 `localStorage`，不會同步到其他裝置。重設按鈕可清除本機進度。

## 練習題型

首頁字卡可切換「英翻中」與「中翻英」方向；選擇保存在目前瀏覽器，並以揭曉答案後的熟悉度回饋作為簡單的主動回想練習。
