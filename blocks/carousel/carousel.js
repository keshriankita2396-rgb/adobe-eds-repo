export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row, index) => {
    if (index === 0) {
      const nextbtn = document.createElement('button');
      nextbtn.classList.add('btn');
      nextbtn.classList.add('btn-next');

      const nextnode = document.createTextNode(row.textContent);
      nextbtn.append(nextnode);
      row.replaceWith(nextbtn);
    } else if (index === rows.length - 1) {
      const prevbtn = document.createElement('button');
      prevbtn.classList.add('btn');
      prevbtn.classList.add('btn-prev');

      const node = document.createTextNode(row.textContent);
      prevbtn.append(node);
      row.replaceWith(prevbtn);
    } else {
      row.classList.add('slide');

      [...row.children].forEach((col, c) => {
        console.log('====', row, col);

        if (c === 0) {
          col.classList.add('slide-text');
        }
      });
    }
  });

  // Select all slides
  const slides = document.querySelectorAll('.slide');

  // Loop through slides and set each slide's translateX
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * 100}%)`;
  });

  // Select next slide button
  const nextSlide = document.querySelector('.btn-next');

  // Current slide counter
  let curSlide = 0;

  // Maximum number of slides
  let maxSlide = slides.length - 1;

  // Next slide button
  nextSlide.addEventListener('click', function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });

  // Select previous slide button
  const prevSlide = document.querySelector('.btn-prev');

  // Previous slide button
  prevSlide.addEventListener('click', function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }

    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });
}