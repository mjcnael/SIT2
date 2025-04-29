document.addEventListener("DOMContentLoaded", function () {
  const width = 600;
  const height = 600;
  const svg = d3.select("svg").attr("width", width).attr("height", height);
  const animationCheckbox = document.getElementById("animation");
  const animationControls = document.getElementById("animation-controls");
  const animateBtn = document.getElementById("animateBtn");
  const drawBtn = document.getElementById("drawBtn");
  const pathMovementCheckbox = document.getElementById("path-movement");
  const pathControls = document.getElementById("path-controls");

  animationCheckbox.addEventListener("change", function () {
    if (this.checked) {
      animationControls.style.display = "block";
      animateBtn.style.display = "inline-block";
      drawBtn.style.display = "none";
    } else {
      animationControls.style.display = "none";
      animateBtn.style.display = "none";
      drawBtn.style.display = "inline-block";
    }
  });

  pathMovementCheckbox.addEventListener("change", function () {
    pathControls.style.display = this.checked ? "block" : "none";
  });

  drawBtn.addEventListener("click", function () {
    draw(document.getElementById("setting"));
  });

  animateBtn.addEventListener("click", function () {
    runAnimation(document.getElementById("setting"));
  });

  document.getElementById("clearBtn").addEventListener("click", function () {
    svg.selectAll("*").remove();
  });
});

let draw = (dataForm) => {
  const svg = d3.select("svg");
  let pict = drawSmile(svg);

  const cx = dataForm.cx.value;
  const cy = dataForm.cy.value;
  const scaleX = dataForm.scaleX.value;
  const scaleY = dataForm.scaleY.value;
  const rotation = dataForm.rotation.value;

  pict.attr(
    "transform",
    `translate(${cx}, ${cy}) scale(${scaleX}, ${scaleY}) rotate(${rotation})`,
  );
};

let runAnimation = (dataForm) => {
  const svg = d3.select("svg");
  let pict = drawSmile(svg);

  const cx = dataForm.cx.value;
  const cy = dataForm.cy.value;
  const cx_finish = dataForm.cx_finish.value;
  const cy_finish = dataForm.cy_finish.value;
  const scaleX = dataForm.scaleX.value;
  const scaleY = dataForm.scaleY.value;
  const rotation = dataForm.rotation.value;
  const easingType = dataForm.easing.value;

  let easingFunction;
  switch (easingType) {
    case "linear":
      easingFunction = d3.easeLinear;
      break;
    case "elastic":
      easingFunction = d3.easeElastic;
      break;
    case "bounce":
      easingFunction = d3.easeBounce;
      break;
    default:
      easingFunction = d3.easeBounce;
  }

  if (!dataForm["path-movement"].checked) {
    pict.attr(
      "transform",
      `translate(${cx}, ${cy}) scale(${scaleX}, ${scaleY}) rotate(${rotation})`,
    );

    pict
      .transition()
      .duration(6000)
      .ease(easingFunction)
      .attr(
        "transform",
        `translate(${cx_finish}, ${cy_finish}) scale(${scaleX}, ${scaleY}) rotate(${rotation})`,
      );
  } else {
    const pathType = dataForm["path-type"].value;
    const path = drawPath(pathType);

    pict.attr(
      "transform",
      `translate(${cx}, ${cy}) scale(${scaleX}, ${scaleY}) rotate(${rotation})`,
    );

    pict
      .transition()
      .ease(d3.easeLinear)
      .duration(6000)
      .attrTween("transform", translateAlong(path.node()));
  }
};
