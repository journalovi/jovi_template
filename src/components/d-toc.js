// Copyright 2018 The Distill Template Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export class TOC extends HTMLElement {

  static get is() { return 'd-toc'; }

  connectedCallback() {
    if (!this.getAttribute('prerendered')) {
      window.onload = () => {
        const article = document.querySelector('d-article');
        const headings = article.querySelectorAll('h2, h3');
        renderTOC(this, headings);
      };
    }
  }

}

export function renderTOC(element, headings) {

  let ToC =`
  <style>

  d-toc {
    contain: layout style;
    display: block;
	margin-bottom: 2rem;
  }

  @media (min-width: 1000px) {
    d-toc {      
      grid-column-start: 1;
      grid-column-end: 4;
      grid-row-start: 1;
      grid-row-end: 10;
      justify-self: end;
      padding-right: 1rem;
    }

    d-toc nav {
      padding-right: 3em;
      padding-left: 2em;
    }
  }

  d-toc h2 {
    font-size: 20px;
    font-weight: 700;
    border: none;
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 1em;
  }
  
  d-toc ul {
    padding-left: 0;
    list-style-type: none;
    font-family: -apple-system, BlinkMacSystemFont, "Roboto", Helvetica, sans-serif;
  }

  d-toc li, d-toc ul {
    margin-bottom: 0.5em;
  }

  d-toc ul > ul {
    padding-left: 12px;
  }

  d-toc a {
    border-bottom: none;
    text-decoration: none;
  }
  
  d-toc > nav > h2 {
	counter-reset: toc-section;
  }
  
  d-toc > nav > ul > li :before {
	counter-increment: toc-section;
	content: counter(toc-section) " ";
  }
  
  d-toc > nav > ul > li {
	counter-reset: toc-subsection;
  }

  d-toc > nav > ul > ul > li :before {
	counter-increment: toc-subsection;
	content: counter(toc-section) "." counter(toc-subsection) " ";
  }

  </style>
  <nav role="navigation" class="table-of-contents figcaption">
  <h2>Contents</h2>
  <ul>`;

  var previousTag = "";
  for (const el of headings) {
    // should element be included in TOC?
    const isInTitle = el.parentElement.tagName == 'D-TITLE';
    const isException = el.getAttribute('no-toc');
    if (isInTitle || isException) continue;
    // create TOC entry
    const title = el.textContent;
    const link = '#' + el.getAttribute('id');

    let newLine = '<li>' + '<a href="' + link + '">' + title + '</a>' + '</li>';
    if (el.tagName == 'H3' && previousTag != 'H3') {
      newLine = '<ul>' + newLine;
    } else if (el.tagName != 'H3' && previousTag == 'H3') {
      newLine = '</ul>' + newLine;
    }
    
    ToC += newLine;
    previousTag = el.tagName;
  }
  if (previousTag == 'H3') {
    ToC += '</ul>';
  }

  ToC += '</ul></nav>';
  element.innerHTML = ToC;
}
