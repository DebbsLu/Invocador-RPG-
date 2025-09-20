document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('heroName');
  const idInput   = document.getElementById('playerId');
  const emailInput= document.getElementById('email');
  const summonBtn = document.getElementById('summonBtn');

  const nameStatus = document.getElementById('nameStatus');
  const idStatus   = document.getElementById('idStatus');
  const emailStatus= document.getElementById('emailStatus');

  const nameError  = document.getElementById('nameError');
  const idError    = document.getElementById('idError');
  const emailError = document.getElementById('emailError');

  const resultBox  = document.getElementById('result');
  const rpgIdEl    = document.getElementById('rpgId');
  const rpgNameEl  = document.getElementById('rpgName');
  const rpgEmailEl = document.getElementById('rpgEmail');
  const invocationMessage = document.getElementById('invocationMessage');

  const reName  = /^[A-Z][a-z]+$/;
  const reId    = /^RPG-\d{6}$/;
  const reEmail = /^[a-z0-9]+@(quest|game|gmail|hotmail|yahoo|outlook)\.com$/i;



  function setStatus(el, ok) {
    el.classList.remove('ok','err');
    if (ok) el.classList.add('ok');
    else if (ok === false) el.classList.add('err');
    el.textContent = ok ? '✓' : (ok === false ? '✕' : '');
  }

  function showError(inputType, valid) {
    if (inputType === "name") {
      nameError.textContent = valid ? "" : "El nombre debe iniciar con mayúscula y solo letras. Ejemplo: Arion";
    }
    if (inputType === "id") {
      idError.textContent = valid ? "" : "El ID debe iniciar con RPG- seguido de 6 dígitos. Ejemplo: RPG-000123";
    }
    if (inputType === "email") {
      emailError.textContent = valid 
  ? "" 
  : "El correo debe contener letras o números y terminar en @quest.com, @game.com, @gmail.com, @hotmail.com, @yahoo.com o @outlook.com. Ejemplo: Heroe123@gmail.com";

    }
  }

  function validateAll() {
    const vName = reName.test(nameInput.value.trim());
    const vId   = reId.test(idInput.value.trim());
    const vEmail= reEmail.test(emailInput.value.trim());

    setStatus(nameStatus, vName);
    setStatus(idStatus, vId);
    setStatus(emailStatus, vEmail);

    showError("name", vName);
    showError("id", vId);
    showError("email", vEmail);

    const allOk = vName && vId && vEmail;
    summonBtn.disabled = !allOk;

    return { allOk, vName, vId, vEmail };
  }

  [nameInput, idInput, emailInput].forEach(input => {
    input.addEventListener('input', validateAll);
    input.addEventListener('blur', validateAll);
  });

  summonBtn.addEventListener('click', () => {
    const { vName, vId, vEmail } = validateAll();
    if (!(vName && vId && vEmail)) return;

    const heroName = nameInput.value.trim();
    const playerId = idInput.value.trim();
    const email    = emailInput.value.trim();

    rpgNameEl.textContent = heroName;
    rpgIdEl.textContent   = playerId;
    rpgEmailEl.textContent= email;

    invocationMessage.textContent = `“Tu héroe ${playerId} ha sido invocado para la misión.”`;

    resultBox.classList.remove('hidden');
    resultBox.animate([
      { transform: 'translateY(16px) scale(.98)', opacity: 0 },
      { transform: 'translateY(0) scale(1)', opacity: 1 }
    ], { duration: 420, easing: 'cubic-bezier(.2,.9,.2,1)', fill: 'forwards' });
  });

  validateAll();
});
