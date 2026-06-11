/* Shared header + footer injection so pages stay DRY. */
(function () {
  const pages = [
    ['home.html', 'Home'],
    ['about.html', 'About'],
    ['story.html', 'My Story'],
    ['education.html', 'Education'],
    ['skills.html', 'Skills'],
    ['hobbies.html', 'Hobbies'],
    ['gallery.html', 'Gallery'],
    ['achievements.html', 'Achievements'],
    ['contact.html', 'Contact'],
  ];

  const navHTML = `
    <nav class="navbar" role="navigation" aria-label="Primary">
      <div class="nav-inner">
        <a href="home.html" class="brand">◢ MY//PORTFOLIO</a>
        <ul class="nav-links" id="navLinks">
          ${pages.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')}
        </ul>
        <div class="nav-tools">
          <button class="theme-toggle" data-theme-toggle aria-label="Toggle theme">🌙</button>
          <button class="hamburger" data-hamburger aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>`;

  const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="brand" style="font-size:1.1rem;margin-bottom:0.75rem">◢ MY//PORTFOLIO</div>
            <p style="color:var(--muted);max-width:340px">
              Passionate About Information, Driven by Technology. A UiTM student exploring the
              intersection of code, design, and curiosity.
            </p>
            <div class="socials" aria-label="Social links">
              <a href="#" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
              </a>
              <a href="#" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.7A1.8 1.8 0 116.5 3a1.8 1.8 0 010 3.7zM20 19h-3v-5.6c0-3.4-4-3.1-4 0V19h-3V8h3v1.8c1.4-2.6 7-2.8 7 2.5V19z"/></svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zM17.083 19.77h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="home.html">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="story.html">My Story</a></li>
              <li><a href="gallery.html">Gallery</a></li>
            </ul>
          </div>
          <div>
            <h4>More</h4>
            <ul>
              <li><a href="education.html">Education</a></li>
              <li><a href="skills.html">Skills</a></li>
              <li><a href="achievements.html">Achievements</a></li>
              <li><a href="hobbies.html">Hobbies</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:paankun0506@gmail.com">paankun0506@gmail.com</a></li>
              <li><a href="tel:+60123456789">+60 12 345 6789</a></li>
              <li>Taman Pauh, Pulau Pinang, Malaysia</li>
              <li>Universiti Teknologi MARA</li>
            </ul>
          </div>
        </div>
        <p class="copyright">© <span data-year></span> My Portfolio. Crafted with chrome &amp; curiosity.</p>
      </div>
    </footer>
    <button class="back-top" aria-label="Back to top">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>
    <div class="lightbox" role="dialog" aria-label="Image preview">
      <button class="lightbox-close" aria-label="Close preview">✕</button>
      <img src="" alt="" />
    </div>
    <div class="preloader" aria-hidden="true">
      <div class="loader-ring"></div>
      <div class="loader-text">LOADING SYSTEM…</div>
    </div>
  `;

  function inject() {
    const navMount = document.getElementById('nav-mount');
    const footMount = document.getElementById('footer-mount');
    if (navMount) navMount.outerHTML = navHTML;
    if (footMount) footMount.outerHTML = footerHTML;
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();