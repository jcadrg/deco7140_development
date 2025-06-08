document.addEventListener('DOMContentLoaded', () => {
  const editBtn = document.getElementById('edit-profile-btn');
  const modal = document.getElementById('edit-modal');
  const overlay = document.getElementById('modal-overlay');
  const cancelBtn = document.getElementById('cancel-edit');

  const mockData = {
    user_name: 'Orange Digital Center',
    email: 'info@orangedigital.au',
    custom_field_1: 'Brisbane, Australia',
    custom_field_2: 'Creator',
    custom_field_longtext_1:
      'We’re a passionate team empowering youth to build with tech and share their knowledge. From Arduino to AI — we explore it all!',
    custom_field_longtext_2: 'IoT, DIY, AI & Robotics, 3D Printing, Maker Education',
    profile_photo: 'assets/img/avatar.png',
    date_created: '2016-07-19T00:00:00Z'
  };

  // Populate visible profile info
  document.getElementById('profile-photo').src = mockData.profile_photo;
  document.getElementById('user-name').textContent = mockData.user_name;
  document.getElementById('user-email').textContent = mockData.email;
  document.getElementById('user-role').textContent = mockData.custom_field_2;
  document.getElementById('user-location').textContent = mockData.custom_field_1;
  document.getElementById('user-description').textContent = mockData.custom_field_longtext_1;
  document.getElementById('user-interests').textContent = mockData.custom_field_longtext_2;
  document.getElementById('join-date').textContent = `Joined ${new Date(mockData.date_created).toLocaleDateString()}`;

  // Pre-fill the modal form
  document.getElementById('user_name').value = mockData.user_name;
  document.getElementById('email').value = mockData.email;
  document.getElementById('custom_field_1').value = mockData.custom_field_1;
  document.getElementById('custom_field_2').value = mockData.custom_field_2;
  document.getElementById('custom_field_longtext_1').value = mockData.custom_field_longtext_1;
  document.getElementById('custom_field_longtext_2').value = mockData.custom_field_longtext_2;

  // Modal open/close behavior
  const openModal = () => {
    modal.classList.remove('hidden');
  };

  const closeModal = () => {
    modal.classList.add('hidden');
  };

  editBtn.addEventListener('click', openModal);
  overlay.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});
