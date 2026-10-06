const pages = [
  { id: 'home', label: 'Home', icon: '⌂', route: '' },
  { id: 'education', label: 'Education', icon: '◇', route: 'education/' },
  { id: 'experience', label: 'Experience', icon: '▣', route: 'experience/' },
  { id: 'projects', label: 'Projects', icon: '▤', route: 'projects/' },
  { id: 'skills', label: 'Skills', icon: '✳', route: 'skills/' },
  { id: 'certificates', label: 'Certificates', icon: '☆', route: 'certificates/' },
  { id: 'ask', label: 'Ask AI', icon: '▢', route: 'ask/' },
  { id: 'contact', label: 'Get In Touch', icon: '✉', route: 'contact/' }
];

const body = document.body;
const isNestedPage = body.dataset.level === 'nested';
const basePath = isNestedPage ? '../' : './';
const sidebar = document.querySelector('#sidebar');
const currentPage = body.dataset.page;

sidebar.innerHTML = `
  <a class="brand" href="${basePath}" aria-label="Kembali ke Home">ZN</a>
  <div class="identity">
    <div class="avatar" aria-hidden="true">ZN</div>
    <h2>Muhammad Zulva Navis</h2>
    <p>Management &amp; Business Support</p>
  </div>
  <nav aria-label="Navigasi utama">
    ${pages.map(page => {
      const current = page.id === currentPage;
      return `<a class="nav-link" href="${basePath}${page.route || './'}"${current ? ' aria-current="page"' : ''}><span class="nav-icon" aria-hidden="true">${page.icon}</span><span>${page.label}</span></a>`;
    }).join('')}
  </nav>
  <div class="sidebar-bottom">
    <label class="theme-control"><span>◐ &nbsp; Dark Mode</span><input id="theme-toggle" type="checkbox" aria-label="Aktifkan dark mode"><i class="switch"></i></label>
    <p class="side-caption">BASED IN</p><p>Malang, Indonesia</p>
    <p class="side-caption" style="margin-top:12px">SOCIAL NETWORKS</p><p class="social-note">Belum dicantumkan di CV</p>
  </div>`;

const themeToggle = document.querySelector('#theme-toggle');
try {
  if (localStorage.getItem('portfolio-theme') === 'dark') {
    body.classList.add('dark');
    themeToggle.checked = true;
  }
  themeToggle.addEventListener('change', () => {
    body.classList.toggle('dark', themeToggle.checked);
    localStorage.setItem('portfolio-theme', themeToggle.checked ? 'dark' : 'light');
  });
} catch {
  themeToggle.addEventListener('change', () => body.classList.toggle('dark', themeToggle.checked));
}

const menuToggle = document.querySelector('#menu-toggle');
menuToggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
});
sidebar.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  sidebar.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const answerBank = [
  { terms: ['proyek', 'unggulan', 'digitalagency', 'efarm'], text: 'Dua proyek utama yang tercantum di CV adalah digitalagency.web.id (Program Mahasiswa Wirausaha 2025; tim 3 orang; 11 mitra UMKM) dan efarmuntukindonesia.id (Program Kreatif Mahasiswa 2023; tim 4 orang; 7 mitra petani dan 2 mitra peternak).' },
  { terms: ['pengalaman', 'magang', 'kerja'], text: 'CV mencantumkan tiga pengalaman: Staff Pemasaran di PT Inzaghi Gigantara Solusindo (Apr–Jun 2025), Staf Publikasi dan Dokumentasi di KB TK ABA 11 Malang (Jul–Des 2024), dan Staf Administrasi Program RPL PG PAUD di Universitas Muhammadiyah Surabaya (Jul 2023–Okt 2024).' },
  { terms: ['pendidikan', 'kuliah', 'ipk', 'universitas'], text: 'Muhammad Zulva Navis adalah lulusan Program Sarjana Manajemen Universitas Negeri Surabaya dengan IPK 3,54/4,00 dan predikat Cumlaude.' },
  { terms: ['skill', 'keahlian', 'alat', 'software'], text: 'Keahlian yang tercantum meliputi Microsoft Office, Google Workspace, Coretax Portal (E-Bupot), Software Zahir Online, komunikasi, dokumentasi, kerja tim, pengelolaan data, perencanaan, koordinasi, administrasi, dan perhatian terhadap detail.' },
  { terms: ['organisasi', 'ice', 'ketua'], text: 'CV mencantumkan pengalaman sebagai Ketua Umum Islamic Community Of Economic (ICE) FEB Unesa pada Jan 2024–Jan 2025. Pendapatan organisasi meningkat 60% dari modal awal Rp10 juta, sesuai informasi CV.' },
  { terms: ['kontak', 'email', 'telepon', 'hubungi'], text: 'Kontak yang tercantum di CV: muhammadzulvanavis.work@gmail.com dan +62 831-9816-8869. Lokasi: Malang, Indonesia.' },
  { terms: ['sertifikat', 'prestasi', 'juara', 'penghargaan'], text: 'CV mencantumkan pelatihan Coretax dan Zahir Online (2026), program IBM Skillsbuild (2025), Juara 2 LKTI Tingkat Internasional Hijriah Fest (2025), pemateri CMCT (2025), Juara 2 Management Business Plan Competition (2024), serta Business Plan Certification dari MarkPlus Institute (2024).' }
];
const question = document.querySelector('#question');
const answer = document.querySelector('#answer');
if (question && answer) {
  function respond(value) {
    const normalized = value.toLocaleLowerCase('id');
    const match = answerBank.find(item => item.terms.some(term => normalized.includes(term)));
    answer.textContent = match ? match.text : 'Saya belum menemukan jawaban itu di informasi CV yang tersedia. Coba tanyakan tentang proyek, pengalaman, pendidikan, skill, organisasi, sertifikat, atau kontak.';
  }
  document.querySelector('#ask-button').addEventListener('click', () => respond(question.value.trim()));
  question.addEventListener('keydown', event => { if (event.key === 'Enter') respond(question.value.trim()); });
  document.querySelectorAll('.suggestions button').forEach(button => button.addEventListener('click', () => {
    question.value = button.textContent;
    respond(question.value);
  }));
}

document.querySelectorAll('.current-year').forEach(element => { element.textContent = new Date().getFullYear(); });
