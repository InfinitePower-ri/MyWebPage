async function syncPageContent() {
  const pagePath = window.location.pathname.replace(/^\//, "");
  const dataUrl = "../pages.json";
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) {
      throw new Error("ページデータが読み込めませんでした。");
    }
    const pages = await response.json();
    const page = pages.find((item) => item.href === pagePath);
    if (!page) {
      return;
    }
    document.title = page.title;
    const heading = document.querySelector("h1");
    if (heading) {
      heading.textContent = page.title;
    }
    const description = document.getElementById("page-description");
    if (description) {
      description.textContent = page.description;
    }
  } catch (error) {
    console.error(error);
  }
}

syncPageContent();
