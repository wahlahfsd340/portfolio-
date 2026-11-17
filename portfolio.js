  const $ = s => document.querySelector(s);
    // Typing effect
    const words = ["MERN Stack Developer", "React Developer", "Node.js Developer", "MongoDB Expert", "Full-Stack Problem Solver"];
    let w = 0, c = 0, del = false; const t = $('#typed');
    (function type() {
            const s = words[w]; t.textContent = s.slice(0, c);
    if (!del && c++ === s.length) {del = true; return setTimeout(type, 1400)}
    if (del && --c < 0) {del = false; c = 0; w = (w + 1) % words.length}
    setTimeout(type, del ? 40 : 90)
        })();
    // Skills
    const sk = [["MongoDB", 85], ["Express.js", 88], ["React.js", 92], ["Node.js", 87], ["JavaScript (ES6+)", 93], ["REST APIs", 90], ["HTML & CSS", 95], ["Git & GitHub", 85]];
        $('#sk').innerHTML = sk.map(([n, v]) => `<div class="sk rv"><div class="t"><span>${n}</span><span>${v}%</span></div><div class="bar"><i style="--w:${v}%" data-w="${v}"></i></div></div>`).join('');
    const cols = ["#ff3d81", "#ff9f1c", "#16e0bd", "#4d7cff", "#9b5cff"];
        $('#chips').innerHTML = ["Redux", "JWT Auth", "Mongoose", "Tailwind", "Bootstrap", "Postman", "Vite", "Vercel", "Figma", "Socket.io"].map((n, i) => `<span class="chip" style="color:${cols[i % 5]};border-color:${cols[i % 5]};animation-delay:${i * .2}s">${n}</span>`).join('');
    // Projects
    const pr = [["🛒", "E-Commerce Store", "Cart, checkout, admin dashboard and JWT login.", ["React", "Node", "MongoDB"], "#ff3d81"], ["💬", "Real-Time Chat App", "Live rooms and typing indicators with Socket.io.", ["Socket.io", "Express", "React"], "#16e0bd"], ["📝", "Task Manager", "Drag and drop boards with user accounts.", ["MERN", "Redux", "JWT"], "#ff9f1c"], ["📰", "Blog Platform", "Write, edit and comment on posts with rich text.", ["React", "Mongoose", "REST"], "#4d7cff"], ["🕌", "Quran Website", "Surah list, audio recitation and ayah highlighting.", ["MERN", "Audio", "API"], "#9b5cff"], ["✈️", "Flight Tracker", "Live flights on a map with airport details.", ["API", "Maps", "JS"], "#16e0bd"]];
        $('#pg').innerHTML = pr.map(([i, n, d, tg, cl]) => `<article class="card rv" style="--cl:${cl}"><div class="ic">${i}</div><h3>${n}</h3><p>${d}</p><div class="tags">${tg.map(x => `<span>${x}</span>`).join('')}</div></article>`).join('');
        // Reveal + bars + counters
        const io = new IntersectionObserver(es => es.forEach(e => {
            if (!e.isIntersecting) return; const el = e.target; el.classList.add('in');
            el.querySelectorAll('.bar i').forEach(b => b.style.width = b.dataset.w + '%');
            el.querySelectorAll('[data-n]').forEach(n => {const T = +n.dataset.n; let x = 0; const k = setInterval(() => {x += Math.max(1, T / 40); if (x >= T) {x = T; clearInterval(k)} n.textContent = Math.round(x)}, 35)});
    io.unobserve(el)
        }), {threshold: .15});
        document.querySelectorAll('.rv').forEach((e, i) => {e.style.transitionDelay = (i % 4) * 90 + 'ms'; io.observe(e)});
        // Scroll progress
        addEventListener('scroll', () => {$('#bar').style.width = scrollY / (document.body.scrollHeight - innerHeight) * 100 + '%'});
        // Form
        $('#f').addEventListener('submit', e => {e.preventDefault(); $('#msg').textContent = 'Thanks! Your message was sent. I will reply soon.'; e.target.reset()});
    // Particle canvas
    const cv = $('#bg'), x = cv.getContext('2d'); let P = [], m = {x: -999, y: -999};
    function rs() {cv.width = innerWidth; cv.height = innerHeight; P = Array.from({length: Math.min(70, innerWidth / 14)}, () => ({x: Math.random() * cv.width, y: Math.random() * cv.height, vx: (Math.random() - .5) * .6, vy: (Math.random() - .5) * .6, r: Math.random() * 2.5 + 1, c: cols[Math.random() * 5 | 0]}))}
        rs(); addEventListener('resize', rs); addEventListener('mousemove', e => {m.x = e.clientX; m.y = e.clientY});
    (function draw() {
        x.clearRect(0, 0, cv.width, cv.height);
            P.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > cv.width) p.vx *= -1; if (p.y < 0 || p.y > cv.height) p.vy *= -1;
    const dx = p.x - m.x, dy = p.y - m.y; if (dx * dx + dy * dy < 14000) {p.x += dx * .03; p.y += dy * .03}
    x.fillStyle = p.c; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7); x.fill();
    for (let j = i + 1; j < P.length; j++) {const q = P[j], d = Math.hypot(p.x - q.x, p.y - q.y); if (d < 120) {x.strokeStyle = p.c; x.globalAlpha = 1 - d / 120; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(q.x, q.y); x.stroke(); x.globalAlpha = 1} }
            });
    requestAnimationFrame(draw)
        })();
