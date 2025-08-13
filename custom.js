
document.getElementById("inputText").addEventListener("input", function () {
  document.querySelectorAll(".signText").forEach(el => {
    el.textContent = this.value;
  });
});

document.getElementById("inputTextSubtitle").addEventListener("input", function () {
  document.querySelectorAll(".signTextSubtitle").forEach(el => {
    el.textContent = this.value;
  });
});

function setPictogram(imgElement) {
  document.getElementById("editorPictogram").src = imgElement.src;
}

function setSymbol(imgElement) {
  document.getElementById("ansi_symbol").src = imgElement.src;
}

async function downloadSign() {
  const { jsPDF } = window.jspdf;

  const canvasElement = document.querySelector("#sign");

  const canvas = await html2canvas(canvasElement, {
    scale: 2,
    useCORS: true
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a3"
  });

  const pageHeight = 297;
  const pageWidth = 420;

  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = pageWidth;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save("safety-sign.pdf");

  document.getElementById("popup_download").style.display = "block";
}

window.addEventListener('DOMContentLoaded', () => {
  const defaultSelector = document.querySelector('.selector_button[data-category="sign_template"]');
  if (defaultSelector) {
    defaultSelector.click();
  }
});

document.querySelectorAll('.selector_button').forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.getAttribute('data-category');

    document.querySelectorAll('.image_panel').forEach(panel => {
      panel.style.display = panel.getAttribute('data-category') === selected ? 'block' : 'none';
    });

    document.querySelectorAll('.selector_button').forEach(btn => {
      btn.classList.remove('selected');
    });
    button.classList.add('selected');
  });
});


document.querySelectorAll('.category_selector').forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.getAttribute('data-category');

    document.querySelectorAll('.editor_type').forEach(editor => {
      const ansiEditor = editor.querySelector('.ansi_editor');
      const oshaEditor = editor.querySelector('.osha_editor');

      if (selected === 'ansi_usace') {
        if (ansiEditor) ansiEditor.style.display = 'flex';
        if (oshaEditor) oshaEditor.style.display = 'none';
      } else if (selected === 'osha') {
        if (ansiEditor) ansiEditor.style.display = 'none';
        if (oshaEditor) oshaEditor.style.display = 'flex';
      } else {
        if (ansiEditor) ansiEditor.style.display = 'none';
        if (oshaEditor) oshaEditor.style.display = 'none';
      }
    });

    setPictogram(button);

  });
});

const fontSizeSlider = document.getElementById("fontSizeSlider");
const fontSizeValue = document.getElementById("fontSizeValue");

fontSizeSlider.addEventListener("input", function () {
  const newSize = `${this.value}px`;
  fontSizeValue.textContent = newSize;


  document.querySelectorAll(".signText").forEach(el => {
    el.style.fontSize = newSize;
  });
});


const textPositionSlider = document.getElementById('textPositionSlider');
const textPositionValue = document.getElementById('textPositionValue');

textPositionSlider.addEventListener('input', () => {
  const offset = textPositionSlider.value;
  textPositionValue.textContent = `${offset}px`;

  document.querySelectorAll('.signText').forEach(el => {
    el.style.transform = `translateY(${offset}px)`;
  });
});

function show_editor() {
  document.querySelectorAll(".font-size-control").forEach(el => {
    el.style.display = "inline-flex";
  });
}


const subFontSizeSlider = document.getElementById("subFontSizeSlider");
const subFontSizeValue = document.getElementById("subFontSizeValue");

subFontSizeSlider.addEventListener("input", function () {
  const newSize = `${this.value}px`;
  subFontSizeValue.textContent = newSize;


  document.querySelectorAll(".signTextSubtitle").forEach(el => {
    el.style.fontSize = newSize;
  });
});


const subTextPositionSlider = document.getElementById('subTextPositionSlider');
const subTextPositionValue = document.getElementById('subTextPositionValue');

subTextPositionSlider.addEventListener('input', () => {
  const offset = subTextPositionSlider.value;
  subTextPositionValue.textContent = `${offset}px`;

  document.querySelectorAll('.signTextSubtitle').forEach(el => {
    el.style.transform = `translateY(${offset}px)`;
  });
});

function close_popup() {
  document.getElementById("popup_download").style.display = "none";
}