// Copyright 2018 The Distill Template Authors, 2020 The JoVI Template Authors
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

export function endorsementsTemplate(frontMatter) {
  return `
  <div class="byline grid">
    <div class="authors-affiliations grid">
      <h3>Endorsed By</h3>
      <h3>Date</h3>
      <h3>Version</h3>
      ${frontMatter.endorsements.map(endorsement => `
        <p class="author">
          ${endorsement.url ? `
            <a class="name" href="${endorsement.url}">${endorsement.name}</a>` : `
            <span class="name">${endorsement.name}</span>`}
        </p>
        <p class="affiliation">
          ${endorsement.date}
        </p>
      `).join('')}
    </div>
  </div>
`;
}

export class JoviEndorsements extends HTMLElement {

  static get is() { return 'jovi-endorsements'; }

  set frontMatter(frontMatter) {
    this.innerHTML = endorsementsTemplate(frontMatter);
  }

}
