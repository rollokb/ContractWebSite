const REPO_URL = 'https://api.github.com/users/rollokb/starred';

require.ensure(['underscore', 'url'], function(require) {
  const _ = require('underscore');
  const url = require('url');
  
  
  fetch(REPO_URL).then(r => r.json())
    .then(data => renderGithubStream(data))
    .catch(e => console.log("Error = ", e));

  function renderGithubStream(data) {
    
    data = data.map((obj, idx) => {
      var htmlURL = url.parse(obj.html_url);
      obj.githubURL = htmlURL.pathname.substring(1);
      return obj;
    });

    const listTemplate = `
      <% for(var i = 0; i < 5; i++){ %>
        <% var repo = repos[i]; %>
          <li><a href='<%= repo.html_url %>'><%= repo.githubURL %></li>
      <% }; %>
      `;
  
    var template = _.template(listTemplate);
    var html = template({repos: data});

    var gitHubEl = document.getElementById('github-feed');
    gitHubEl.innerHTML = html;
  }

});
