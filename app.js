
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

  if (value.includes('<') || value.includes('>')) {
    voirErr(fieldId, 'Les balises HTML ne sont pas autorisées.');
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

  if (value.includes('<') || value.includes('>')) {
    voirErr('email', 'Les balises HTML ne sont pas autorisées.');
    return false;
  }

  const domainPart = value.split('@')[1];

  // Vérifie le nom de domaine avant le ".com"
  if (domainPart && /[!#$%^&*()~%`,/?".:{}=|;+<>]/.test(domainPart.split('.')[0])) {
    voirErr('email', 'Le nom de domaine ne peut pas contenir de caractères spéciaux.');
    return false;
  }
  // Vérifie le nom et prenom avant le @
  const localPart = value.split('@')[0];
  if (localPart && /[!#$%^&*()`~,/?".%:{}=|;+<>]/.test(localPart)) {
    voirErr('email', 'Le nom d\'utilisateur ne peut pas contenir de caractères spéciaux.');
    return false;
  }
  // Vérifie le nom et prenom avant le @ ne peut pas être uniquement numérique
  if (localPart && /^\d+$/.test(localPart)) {
    voirErr('email', 'Le nom d\'utilisateur ne peut pas être numérique.');
    return false;
  }
  // Vérifie le nom et prenom avant le @ commence par une lettre
  if (localPart && !/^[a-zA-Z]/.test(localPart)) {
    voirErr('email', 'Le nom d\'utilisateur doit commencer par une lettre.');
    return false;
  }
  // Vérifie le nom apres le . doit pas contenir du numérique
  const domainParts = domainPart ? domainPart.split('.') : [];
  if (domainParts.length > 1) {
    const tld = domainParts[domainParts.length - 1];
    if (/\d/.test(tld)) {
      voirErr('email', 'Le domaine de premier niveau ne peut pas contenir de chiffres.');
      return false;
    }
  }
  // Vérifie le nom apres le . doit etre que du lettres minuscules
  if (domainParts.length > 1) {
    const tld = domainParts[domainParts.length - 1];
    if (!/^[a-z]+$/.test(tld)) {
      voirErr('email', 'Le domaine de premier niveau doit être en lettres minuscules.');
      return false;
    }
  }
  // ne pas mettre du majuscule dans tout le mail
    if (/[A-Z]/.test(value)) {
    voirErr('email', 'L\'adresse email ne doit pas contenir de majuscules.');
    return false;
  }


  // Vérifie si le domaine est uniquement numérique
  if (domainPart && /^\d+$/.test(domainPart.split('.')[0])) {
    voirErr('email', 'Le nom de domaine ne peut pas être numérique.');
    return false;
  }

  if (!emailRegex.test(value)) {
    voirErr('email', 'Format invalide. Ex: prenomnom@domaine.com');
    return false;
  }

  voirSucc('email');
  return true;
}


// Valide le select de domaine.
function validationDomaine() {
  const field = document.getElementById('domaine');
  const value = field.value;
  const validDomaines = ['frontend', 'backend', 'design', 'data'];

  if (value === '') {
    voirErr('domaine', 'Merci de sélectionner ton domaine.');
    return false;
  }

  if (!validDomaines.includes(value)) {
    voirErr('domaine', 'Valeur non autorisée.');
    return false;
  }

  voirSucc('domaine');
  return true;
}



// Valide les boutons radio du chrono-type.
function validationChronotype() {
  const radios = document.querySelectorAll('input[name="chronotype"]');
  const checkedRadio = Array.from(radios).find(r => r.checked);
  const validChronotypes = ['earlybird', 'nightowl'];

  if (!checkedRadio) {
    groupeErr('chronotype-error', 'Merci de choisir ton chrono-type.');
    return false;
  }

  if (!validChronotypes.includes(checkedRadio.value)) {
    groupeErr('chronotype-error', 'Valeur non autorisée.');
    return false;
  }

  groupeErr('chronotype-error', '');
  return true;
}

// Valide les cases à cocher des passions.
function validationPassion() {
  const allCheckboxes = document.querySelectorAll('input[name="passions"]');
  const checkedBoxes = Array.from(allCheckboxes).filter(cb => cb.checked);
  const validPassions = ['veille', 'gaming', 'sport', 'musique', 'lecture'];

  const hasInvalid = checkedBoxes.some(cb => !validPassions.includes(cb.value));

  if (hasInvalid) {
    groupeErr('passions-error', 'Une des valeurs sélectionnées est invalide.');
    return false;
  }

  const count = checkedBoxes.length;

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

  if (value.includes('<') || value.includes('>')) {
    voirErr('anecdote', 'Les balises HTML ne sont pas autorisées.');
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

// Affiche tous les profils stockés dans le localStorage
function renderProfiles() {
  const container = document.getElementById('profilesContainer');
  const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
  
  container.innerHTML = ''; // On vide le conteneur avant de re-générer

  profiles.forEach(profile => {
    const initiales = `${profile.prenom.charAt(0)}${profile.nom.charAt(0)}`.toUpperCase();
    const formattedPassions = profile.passions.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(', ');

    const cardHtml = `
      <div class="profile-card" role="region" aria-label="Profil de ${profile.prenom}">
        <div class="card-header">
          <div class="card-badge">Profil</div>
          <div class="card-avatar">${initiales}</div>
          <h2>${profile.prenom} ${profile.nom}</h2>
          <p>${profile.email}</p>
        </div>
        <div class="card-body">
          <div class="card-row">
            <span class="card-key">Domaine</span>
            <span class="card-value">${domainLabels[profile.domaine] || profile.domaine}</span>
          </div>
          <div class="card-row">
            <span class="card-key">Chrono-type</span>
            <span class="card-value">${chronoLabels[profile.chronotype] || profile.chronotype}</span>
          </div>
          <div class="card-row">
            <span class="card-key">Passions</span>
            <span class="card-value">${formattedPassions}</span>
          </div>
          <div class="card-anecdote">
            <p>"${profile.anecdote}"</p>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', cardHtml);
  });

  // On scrolle vers la dernière carte ajoutée si nécessaire
  if (profiles.length > 0 && container.lastElementChild) {
    container.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
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
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value.trim().toLowerCase();
    
    // Récupérer les profils existants depuis le localStorage
    const storedProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');

    // Vérifier si l'email existe déjà (insensible à la casse)
    const emailExists = storedProfiles.some(p => p.email.toLowerCase() === emailValue);

    if (emailExists) {
      voirErr('email', 'Cet email est déjà utilisé pour un profil existant.');
      emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return; // On arrête tout si l'email n'est pas unique
    }

    // Préparer les données du nouveau profil
    const newProfile = {
      prenom: document.getElementById('prenom').value.trim(),
      nom: document.getElementById('nom').value.trim(),
      email: emailValue,
      domaine: document.getElementById('domaine').value,
      chronotype: document.querySelector('input[name="chronotype"]:checked').value,
      passions: Array.from(document.querySelectorAll('input[name="passions"]:checked')).map(cb => cb.value),
      anecdote: document.getElementById('anecdote').value.trim()
    };

    // Ajouter le profil et sauvegarder
    storedProfiles.push(newProfile);
    localStorage.setItem('profiles', JSON.stringify(storedProfiles));

    renderProfiles();
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
  domaine.addEventListener('blur', () => validationDomaine());

  document.querySelectorAll('input[name="chronotype"]').forEach(radio => {
    radio.addEventListener('change', () => {
      miseajourradio(radio);
      validationChronotype();
    });
    radio.addEventListener('blur', () => validationChronotype());
  });

  document.querySelectorAll('input[name="passions"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      miseajourcheckbox(checkbox);
      validationPassion();
    });
    checkbox.addEventListener('blur', () => validationPassion());
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
  renderProfiles(); // Afficher les profils existants au chargement
});