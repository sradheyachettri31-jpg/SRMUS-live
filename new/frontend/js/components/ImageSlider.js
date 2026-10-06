/**
 * Sliding Image Carousel Component - SRMUS Live
 * Features SRM University Sikkim campus building & MERAKI fest images
 * Automatically slides every 4 seconds (4000ms) with smooth transitions
 */

export class ImageSliderComponent {
  constructor(slides = []) {
    this.slides = (slides && slides.length > 0) ? slides : [
      {
        id: 1,
        image: "assets/images/srm_building_front.png",
        title: "SRM University Sikkim",
        subtitle: "Main Campus Building • 5th Mile Tadong, Gangtok"
      },
      {
        id: 2,
        image: "assets/images/srm_campus_angle.png",
        title: "Academic Block & Computing Labs",
        subtitle: "Department of Computer Applications • BCA 2025-2028"
      },
      {
        id: 3,
        image: "assets/images/srm_meraki_fest.png",
        title: "MERAKI - Annual Talent Fest",
        subtitle: "Celebrating Innovation, Music, Art & Culture"
      }
    ];
    this.currentIndex = 0;
    this.intervalId = null;
  }

  render() {
    return `
      <div class="sliding-image-container" id="campus-image-slider">
        <div class="slide-track">
          ${this.slides.map((slide, index) => `
            <div 
              class="slide-item ${index === 0 ? 'active' : ''}" 
              data-index="${index}" 
              style="background-image: url('${slide.image}');"
            >
              <div class="slide-overlay">
                <span class="slide-tag">SRM Sikkim Campus</span>
                <h3 class="slide-title">${slide.title}</h3>
                <p class="slide-subtitle">${slide.subtitle}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="slide-dots">
          ${this.slides.map((_, index) => `
            <div class="slide-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
          `).join('')}
        </div>
      </div>
    `;
  }

  startAutoSlide(container) {
    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      this.nextSlide(container);
    }, 4000); // 4 seconds interval
  }

  nextSlide(container) {
    const slideItems = container.querySelectorAll('.slide-item');
    const dotItems = container.querySelectorAll('.slide-dot');
    if (!slideItems.length) return;

    this.currentIndex = (this.currentIndex + 1) % this.slides.length;

    slideItems.forEach((item, i) => {
      item.classList.toggle('active', i === this.currentIndex);
    });

    dotItems.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });
  }

  goToSlide(container, index) {
    this.currentIndex = index;
    const slideItems = container.querySelectorAll('.slide-item');
    const dotItems = container.querySelectorAll('.slide-dot');

    slideItems.forEach((item, i) => {
      item.classList.toggle('active', i === this.currentIndex);
    });

    dotItems.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });
  }

  bindEvents(container) {
    this.startAutoSlide(container);

    // Dot navigation
    const dots = container.querySelectorAll('.slide-dot');
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'), 10);
        this.goToSlide(container, index);
        this.startAutoSlide(container); // Reset timer
      });
    });
  }

  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
