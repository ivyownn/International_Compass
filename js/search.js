// search.js
function removeHighlights() {
  document.querySelectorAll("mark").forEach((mark) => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
}

function highlightText(searchTerm) {
  if (!searchTerm) return;
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  const regex = new RegExp(searchTerm, "gi");
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    if (node.nodeValue.match(regex)) {
      const parent = node.parentNode;
      const temp = document.createElement("span");
      temp.innerHTML = node.nodeValue.replace(
        regex,
        (match) => `<mark>${match}</mark>`
      );
      parent.replaceChild(temp, node);
      while (temp.firstChild) parent.insertBefore(temp.firstChild, temp);
      parent.removeChild(temp);
    }
  });
}

document.getElementById("searchBtn").addEventListener("click", () => {
  removeHighlights();
  const searchTerm = document.getElementById("searchInput").value.trim();
  if (searchTerm) highlightText(searchTerm);
});
