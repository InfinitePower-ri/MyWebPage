async function syncPageContent() {
  const pathname = window.location.pathname.replace(/\\/g, "/");
  const segments = pathname.split("/").filter(Boolean);
  const pagePath = segments.slice(-2).join("/");
  const dataUrl = new URL("../pages.json", document.baseURI).href;
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) {
      throw new Error("ページデータが読み込めませんでした。");
    }
    const pages = await response.json();
    const page = pages.find((item) => item.href === pagePath);
    const description = document.getElementById("page-description");
    if (!page) {
      if (description) {
        description.textContent = "ページ情報が見つかりませんでした。";
      }
      return;
    }
    document.title = page.title;
    const heading = document.querySelector("h1");
    if (heading) {
      heading.textContent = page.title;
    }
    if (description) {
      description.textContent = page.description;
    }
  } catch (error) {
    console.error(error);
    const description = document.getElementById("page-description");
    if (description) {
      description.textContent = "ページデータの読み込みに失敗しました。";
    }
  }
}

syncPageContent();
