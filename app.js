
function voirErr(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);
  if (field) {
    field.classList.remove('valid');
    field.classList.add('error');
  }
  if (error) error.textContent = message;
}

//Marque un champ comme valide et efface l'erreur.
function voirSucc(fieldId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);
  if (field) {
    field.classList.remove('error');
    field.classList.add('valid');
  }
  if (error) error.textContent = '';
}

// Affiche/efface un message d'erreur hors champ (radio, checkbox).
function groupeErr(errorId, message) {
  const error = document.getElementById(errorId);
  if (error) error.textContent = message;
}

/* =============================================
   FONCTIONS DE VALIDATION INDIVIDUELLES
   ============================================= */


// Valide un champ texte (prénom ou nom).
function validationTextefield(fieldId) {
  const field = document.getElementById(fieldId);
  const value = field.value.trim();

  if (value === '') {
    voirErr(fieldId, 'Ce champ est obligatoire.');
    return false;
  }
  if (value.length < 3) {
    voirErr(fieldId, 'Minimum 3 caractères requis.');
    return false;
  }
  voirSucc(fieldId);
  return true;
}



// Valide l'adresse email.
function validationEmail() {
  const field = document.getElementById('email');
  const value = field.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === '') {
    voirErr('email', 'L\'adresse email est obligatoire.');
    return false;
  }
  if (!emailRegex.test(value)) {
    voirErr('email', 'Format invalide. Ex: prenom.nom@domaine.fr');
    return false;
  }
  voirSucc('email');
  return true;
}


// Valide le select de domaine.
function validationDomaine() {
  const field = document.getElementById('domaine');
  const value = field.value;

  if (value === '') {
    voirErr('domaine', 'Merci de sélectionner ton domaine.');
    return false;
  }
  voirSucc('domaine');
  return true;
}



// Valide les boutons radio du chrono-type.
function validationChronotype() {
  const radios = document.querySelectorAll('input[name="chronotype"]');
  const checked = Array.from(radios).some(r => r.checked);

  if (!checked) {
    groupeErr('chronotype-error', 'Merci de choisir ton chrono-type.');
    return false;
  }
  groupeErr('chronotype-error', '');
  return true;
}

// Valide les cases à cocher des passions.
function validationPassion() {
  const checkboxes = document.querySelectorAll('input[name="passions"]:checked');
  const count = checkboxes.length;

  if (count < 2) {
    groupeErr('passions-error', `Sélectionne au moins 2 centres d'intérêt (${count}/2 cochés).`);
    return false;
  }
  groupeErr('passions-error', '');
  return true;
}


// Valide le textarea de l'anecdote.
function validationAnecdote() {
  const field = document.getElementById('anecdote');
  const value = field.value.trim();
  const len = value.length;

  if (value === '') {
    voirErr('anecdote', 'Ce champ est obligatoire.');
    return false;
  }
  if (len < 25) {
    voirErr('anecdote', `Encore ${25 - len} caractère(s) minimum.`);
    return false;
  }
  if (len > 255) {
    voirErr('anecdote', `Trop long : ${len - 255} caractère(s) en trop.`);
    return false;
  }
  voirSucc('anecdote');
  return true;
}

/* =============================================
   COMPTEUR DE CARACTÈRES (TEMPS RÉEL)
   ============================================= */

// Met à jour l'affichage du compteur de caractères du textarea.
function miseajourcoupteur() {
  const field = document.getElementById('anecdote');
  const counter = document.getElementById('char-count');
  const len = field.value.trim().length;

  counter.textContent = `${len} / 255`;
  counter.classList.remove('warn', 'ok');

  if (len >= 25 && len <= 255) {
    counter.classList.add('ok');
  } else if (len > 220) {
    counter.classList.add('warn');
  }
}

/* =============================================
   MISE À JOUR VISUELLE DES CUSTOM INPUTS
   ============================================= */

// Met à jour la classe CSS d'une radio card selon son état.
function miseajourradio(radio) {
  const allCards = document.querySelectorAll('.radio-card');
  allCards.forEach(card => card.classList.remove('checked'));
  if (radio.checked) {
    radio.closest('.radio-card').classList.add('checked');
  }
}


// Met à jour la classe CSS d'une checkbox card selon son état.
function miseajourcheckbox(checkbox) {
  const card = checkbox.closest('.checkbox-card');
  if (checkbox.checked) {
    card.classList.add('checked');
  } else {
    card.classList.remove('checked');
  }
}

/* =============================================
   CARTE DE PROFIL
   ============================================= */

// Mapping des labels lisibles pour le select domaine
const domainLabels = {
  frontend: 'Front-End',
  backend: 'Back-End',
  design: 'Design / UX',
  data: 'Data',
};

// Mapping des labels lisibles pour le chrono-type
const chronoLabels = {
  earlybird: 'Early Bird — Matin',
  nightowl: 'Night Owl — Soir',
};

// Récupère les valeurs du formulaire et affiche la carte de profil.
function voirProfilcree() {
  const prenom = document.getElementById('prenom').value.trim();
  const nom = document.getElementById('nom').value.trim();
  const email = document.getElementById('email').value.trim();
  const domaine = document.getElementById('domaine').value;
  const chronotype = document.querySelector('input[name="chronotype"]:checked').value;
  const passions = Array.from(
    document.querySelectorAll('input[name="passions"]:checked')
  ).map(cb => cb.value.charAt(0).toUpperCase() + cb.value.slice(1));
  const anecdote = document.getElementById('anecdote').value.trim();

  const initiales = `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();

  document.getElementById('card-avatar').textContent = initiales;
  document.getElementById('card-name').textContent = `${prenom} ${nom}`;
  document.getElementById('card-email').textContent = email;
  document.getElementById('card-domaine').textContent = domainLabels[domaine] || domaine;
  document.getElementById('card-chrono').textContent = chronoLabels[chronotype] || chronotype;
  document.getElementById('card-passions').textContent = passions.join(', ');
  document.getElementById('card-anecdote').textContent = `"${anecdote}"`;

  const card = document.getElementById('profileCard');
  card.classList.remove('hidden');
  card.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* =============================================
   RÉINITIALISATION DU FORMULAIRE
   ============================================= */

// Réinitialise le formulaire et l'état visuel de tous les champs.
function refuForm() {
  const form = document.getElementById('profileForm');
  form.reset();

  document.querySelectorAll('input, select, textarea').forEach(el => {
    el.classList.remove('valid', 'error');
  });

  document.querySelectorAll('.field-error').forEach(el => {
    el.textContent = '';
  });

  document.querySelectorAll('.radio-card').forEach(card => {
    card.classList.remove('checked');
  });

  document.querySelectorAll('.checkbox-card').forEach(card => {
    card.classList.remove('checked');
  });

  document.getElementById('char-count').textContent = '0 / 255';
  document.getElementById('char-count').classList.remove('warn', 'ok');
}

/* =============================================
   SOUMISSION DU FORMULAIRE
   ============================================= */

// Valide tous les champs, affiche la carte si tout est valide.
function handleSubmit(e) {
  e.preventDefault();

  const isPrenom = validationTextefield('prenom');
  const isNom = validationTextefield('nom');
  const isEmail = validationEmail();
  const isDomaine = validationDomaine();
  const isChronotype = validationChronotype();
  const isPassions = validationPassion();
  const isAnecdote = validationAnecdote();

  const allValid = isPrenom && isNom && isEmail && isDomaine && isChronotype && isPassions && isAnecdote;

  if (allValid) {
    voirProfilcree();
    refuForm();
  } else {
    const firstError = document.querySelector('.error, [id$="-error"]:not(:empty)');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

/* =============================================
   FEEDBACK EN TEMPS RÉEL (BLUR / INPUT / CHANGE)
   ============================================= */

function feedbackvalidation() {
  const prenom = document.getElementById('prenom');
  const nom = document.getElementById('nom');
  const email = document.getElementById('email');
  const domaine = document.getElementById('domaine');
  const anecdote = document.getElementById('anecdote');

  prenom.addEventListener('blur', () => validationTextefield('prenom'));
  prenom.addEventListener('input', () => {
    if (prenom.classList.contains('error') || prenom.classList.contains('valid')) {
      validationTextefield('prenom');
    }
  });

  nom.addEventListener('blur', () => validationTextefield('nom'));
  nom.addEventListener('input', () => {
    if (nom.classList.contains('error') || nom.classList.contains('valid')) {
      validationTextefield('nom');
    }
  });

  email.addEventListener('blur', () => validationEmail());
  email.addEventListener('input', () => {
    if (email.classList.contains('error') || email.classList.contains('valid')) {
      validationEmail();
    }
  });

  domaine.addEventListener('change', () => validationDomaine());

  document.querySelectorAll('input[name="chronotype"]').forEach(radio => {
    radio.addEventListener('change', () => {
      miseajourradio(radio);
      validationChronotype();
    });
  });

  document.querySelectorAll('input[name="passions"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      miseajourcheckbox(checkbox);
      validationPassion();
    });
  });

  anecdote.addEventListener('input', () => {
    miseajourcoupteur();
    if (anecdote.classList.contains('error') || anecdote.classList.contains('valid')) {
      validationAnecdote();
    }
  });

  anecdote.addEventListener('blur', () => validationAnecdote());
}

/* =============================================
   INITIALISATION
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('profileForm');
  form.addEventListener('submit', handleSubmit);
  feedbackvalidation();
});