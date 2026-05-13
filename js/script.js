gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.2,
    effects: true,
    smoothTouch: 0.1
});

gsap.from(".hero > *", {
    y: 50,
    opacity: 0,
    filter: "blur(20px)",
    duration: 1.5,
    stagger: 0.2,
    ease: "power4.out"
});

gsap.utils.toArray(".scroll-effect").forEach(section => {
    gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    })
    .fromTo(section, 
        { scale: 0.9, rotationX: -10, opacity: 0.5 }, 
        { scale: 1, rotationX: 0, opacity: 1, duration: 1, ease: "none" }
    )
    .to(section, 
        { scale: 0.9, rotationX: 10, opacity: 0.5, duration: 1, ease: "none" }
    );
});

const downloadUrl = "https://github.com/7controversed/CPS-Guard/releases/download/v1.3/CPS.Guard.zip";

function handleDownload() {
    const modal = document.getElementById('download-modal');
    modal.classList.add('active');
    setTimeout(() => { window.location.href = downloadUrl; }, 800);
}

function closeModal() {
    document.getElementById('download-modal').classList.remove('active');
}

function scrollToVideo() {
    smoother.scrollTo("#video", true, "center center");
}

async function fetchDownloads() {
    const repo = "7controversed/CPS-Guard"; 
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}/releases`);
        const releases = await response.json();
        let total = 0;
        releases.forEach(rel => rel.assets.forEach(as => total += as.download_count));
        animateCount(total);
    } catch (e) { document.getElementById('download-count').textContent = "150+"; }
}

function animateCount(target) {
    const el = document.getElementById('download-count');
    let obj = { val: 0 };
    gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power3.out",
        onUpdate: () => el.textContent = Math.ceil(obj.val)
    });
}

fetchDownloads();
