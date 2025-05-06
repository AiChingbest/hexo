function search() {
  const searchValue = document.getElementById("search_value").value.trim();
  const searchResultsContainer = document.getElementById("search_results");

  searchResultsContainer.innerHTML = "";

  if (!searchValue) {
    console.log("搜索框为空，不执行搜索");
    return false;
  }

  console.log("开始搜索，关键词:", searchValue);

  fetch("/search.xml")
    .then((response) => response.text())
    .then((xml) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "application/xml");

      if (doc.documentElement.nodeName === "parsererror") {
        console.error("XML 解析错误:", doc.documentElement.textContent);
        return;
      }

      console.log("1. 解析后的 DOM 对象:", doc);

      const entries = doc.querySelectorAll("entry"); //  修改了选择器
      console.log("2. 找到的 entry 元素:", entries);

      const data = [];

      entries.forEach((entry) => {  // 修改了循环变量名
        const title = entry.querySelector("title").textContent;
        const content = entry.querySelector("content").textContent;
        const url = entry.querySelector("url").textContent;
        data.push({ title: title, content: content, url: url });
      });

      console.log("3. 准备用于搜索的数据:", data);

      const fuse = new Fuse(data, {
        keys: ["title", "content"],
        threshold: 0.3,
      });

      const results = fuse.search(searchValue);
      console.log("4. Fuse.js 搜索结果:", results);

      if (results.length > 0) {
        const resultsList = document.createElement("ul");
        results.forEach((result) => {
          const item = document.createElement("li");
          const link = document.createElement("a");
          link.href = result.item.url;
          link.textContent = result.item.title;
          item.appendChild(link);
        });
        searchResultsContainer.appendChild(resultsList);
      } else {
        const noResults = document.createElement("p");
        noResults.textContent = "没有找到相关的文章。";
        searchResultsContainer.appendChild(noResults);
      }
    })
    .catch((error) => {
      console.error("加载搜索数据失败:", error);
      searchResultsContainer.textContent = "加载搜索数据失败，请稍后再试。";
    });

  return false;
}