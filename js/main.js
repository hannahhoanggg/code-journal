const $titleBoxInput = document.querySelector('#title-text');
const $imageInput = document.querySelector('#image-text');
const $notesText = document.querySelector('#notes-text');
const $image = document.querySelector('img');
const $form = document.querySelector('form');

$imageInput.addEventListener('input', updateImage);

function updateImage(event) {
  const photoURL = $imageInput.value;
  $image.setAttribute('src', photoURL);
}

$form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();
  const formValues = {
    imageUrl: $imageInput.value,
    title: $titleBoxInput.value,
    notes: $notesText.value,
    entryId: data.nextEntryId,
  };

  data.nextEntryId++;
  data.entries.unshift(formValues);
  $form.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
}
