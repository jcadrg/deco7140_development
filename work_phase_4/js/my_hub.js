// js/my_hub.js
import { postFormData } from './components/postData.js';

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericuserprofile/', {
    method: 'GET',
    headers: {
      'student_number': 's4828221',
      'uqcloud_zone_id': '9806dd61'
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log('✅ GET Success:', data);
      showToast('GET request successful!');
        if (Array.isArray(data) && data.length > 0) {
        const profile = data[0]; // grab the most recent one

        document.getElementById('profile-photo').src = profile.profile_photo || 'assets/img/avatar.png';
        document.getElementById('user-name').textContent = profile.user_name;
        document.getElementById('user-email').textContent = profile.email;
        document.getElementById('user-role').textContent = profile.custom_field_2;
        document.getElementById('user-location').textContent = profile.custom_field_1;
        document.getElementById('user-description').textContent = profile.custom_field_longtext_1;
        document.getElementById('user-interests').textContent = profile.custom_field_longtext_2;

        // Pre-fill form as well
        document.getElementById('user_name').value = profile.user_name;
        document.getElementById('email').value = profile.email;
        document.getElementById('custom_field_1').value = profile.custom_field_1;
        document.getElementById('custom_field_2').value = profile.custom_field_2;
        document.getElementById('custom_field_longtext_1').value = profile.custom_field_longtext_1;
        document.getElementById('custom_field_longtext_2').value = profile.custom_field_longtext_2;
      }
    })
    .catch(err => {
      console.error('❌ GET Error:', err);
      showToast('GET failed. Check console.', true);
    });

  const editBtn = document.getElementById('edit-profile-btn');
  const modal = document.getElementById('edit-modal');
  const overlay = document.getElementById('modal-overlay');
  const cancelBtn = document.getElementById('cancel-edit');
  const form = document.getElementById('edit-profile-form');
  const feedback = document.getElementById('form-feedback');

  const openModal = () => modal.classList.remove('hidden');
  const closeModal = () => modal.classList.add('hidden');

  editBtn.addEventListener('click', openModal);
  overlay.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    feedback.textContent = 'Submitting...';

    const { success, data } = await postFormData(
      form,
      'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericuserprofile/',
      {
        'student_number': 's4828221',
        'uqcloud_zone_id': '9806dd61'
      }
    );

    if (success) {
      showToast('Profile information edited!');
      form.reset();
      modal.classList.add('hidden');
    } else {
      console.error('❌ POST Error:', data);
      showToast(data.message || 'Error submitting profile.', true);
    }
  });
});

function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast show' + (isError ? ' error' : '');
  setTimeout(() => {
    toast.className = 'toast hidden';
  }, 3000);
}
