 let selectedFlowerSrc = ""; 
    let currentAccessory = null; 
    let selectedDangleSrc = "";
    let currentDangle = null;
    let selectedFlowerType = "";

    function typeText(elementId, text, callback) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.textContent = ""; 

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50); 
        } else if (callback) {
            callback(); 
        }
    }
    type();
}

typeText("step-1-text", "Step 1: Choose Flower");

  function selectFlower(imageSrc) {
      selectedFlowerSrc = imageSrc;

      const displayArea = document.getElementById('selected-flower');
    displayArea.innerHTML = ''; 

    const flower = document.createElement('img');
    flower.src = imageSrc;
    flower.alt = 'Selected Flower';
    flower.className = "flower";

    displayArea.appendChild(flower);

      document.getElementById("step-1").style.display = "none";
      document.getElementById("step-2").style.display = "block";
      typeText("step-2-text", "Step 2: Choose Accessory");
    }

    function addPin() {
    if (currentAccessory) {
        currentAccessory.remove();
    }

    const pin = document.createElement('img');
    pin.src = 'assets/pin.png';
    pin.className = "pin";
    pin.alt = 'Pin';
    pin.classList.add('added-element');
    
    pin.style.position = "absolute";
    pin.style.top = "55%"; 
    pin.style.left = "10%"; 
    
    document.getElementById('selected-flower').appendChild(pin);

    currentAccessory = pin;

    document.getElementById("step-2").style.display = "none";
    document.getElementById("step-1").style.display = "none";
    document.getElementById("step-3").style.display = "block";
    typeText("step-3-text", "Step 3: Choose Dangle");
}


function addEarring() {
  resetDisplayArea();

  const earringContainer = document.createElement('div');
  earringContainer.classList.add('earring-display');

  for (let i = 0; i < 2; i++) {
    const earring = document.createElement('div');
    earring.classList.add('earring');

    const earringHook = document.createElement('img');
    earringHook.src = 'earringhook.png';
    earringHook.alt = 'Earring Hook';
    earringHook.classList.add('earring-hook');

    const flower = document.createElement('img');
    flower.src = selectedFlowerSrc;
    flower.alt = 'Earring Flower';
    flower.classList.add('earring-flower');

    earring.appendChild(earringHook);
    earring.appendChild(flower);
    earringContainer.appendChild(earring);
  }

  document.getElementById('selected-flower').appendChild(earringContainer);
  currentAccessory = earringContainer;

  document.getElementById("step-2").style.display = "none";
  document.getElementById("step-3").style.display = "block";
  typeText("step-3-text", "Step 3: Choose Dangle");
}




function addBagCharm() {
      resetDisplayArea();

      const bagcharm = document.createElement('img');
      bagcharm.src = 'assets/bagcharm.png';
      bagcharm.alt = 'Bag Charm';
      bagcharm.style.width = "100px";
      document.getElementById('selected-flower').appendChild(bagcharm);

      currentAccessory = bagcharm;

      document.getElementById("step-2").style.display = "none";
      document.getElementById("step-3").style.display = "block";
    }

    function selectDangle(dangleSrc) {
    selectedDangleSrc = dangleSrc; 
    addDangle(); 
}

function addDangle() {
    if (!selectedDangleSrc) {
        alert("Please select a dangle option first.");
        return;
    }

    const existingDangles = document.querySelectorAll('.dangle');
    existingDangles.forEach(dangle => dangle.remove());

    if (currentAccessory && currentAccessory.classList.contains('earring-display')) {
        const earrings = document.querySelectorAll('.earring');
        earrings.forEach(earring => {
            const dangle = document.createElement('img');
            dangle.alt = 'Dangle';
            dangle.classList.add('dangle');
            dangle.style.position = 'absolute';
            dangle.style.top = '60%';
            dangle.style.left = '50%';
            dangle.style.transform = 'translateX(-50%)';
            dangle.style.width = '40px'; 
            earring.appendChild(dangle);
            dangle.className = "dangle";
        });
    } else if (currentAccessory && currentAccessory.tagName === 'IMG' && currentAccessory.alt === 'Pin') {
        const dangle = document.createElement('img');
        dangle.src = selectedDangleSrc;
        dangle.alt = 'Dangle';
        dangle.classList.add('dangle');
        dangle.style.position = 'absolute';
        dangle.style.top = '65%';
        dangle.style.left = '50%';
        dangle.style.transform = 'translateX(-50%)';
        dangle.style.width = '100px'; 
        dangle.className = "dangle"
        currentAccessory.parentElement.appendChild(dangle);
    } else {
        alert("Please select an accessory (earrings or pin) first.");
    }

    currentDangle = selectedDangleSrc; 
}


    function resetDisplayArea() {
      document.getElementById('selected-flower').innerHTML = '';
    }

    document.querySelector("audio").volume = 1.0;

    document.getElementById('save-image').addEventListener('click', () => {
    const displayArea = document.getElementById('selected-flower');

    html2canvas(displayArea).then((canvas) => {
        const image = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = image;
        link.download = 'complete-image.png';
        link.click();
    });
});
