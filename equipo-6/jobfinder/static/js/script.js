document.addEventListener('DOMContentLoaded', function() {
    function scheduleAutoHide(alertEl, timeout = 4000) {
        if (!alertEl || alertEl.dataset.autohide === '1') return;
        alertEl.dataset.autohide = '1';
        setTimeout(() => {
            try {
                if (typeof bootstrap !== 'undefined' && bootstrap.Alert) {
                    const bsAlert = new bootstrap.Alert(alertEl);
                    bsAlert.close();
                } else {
                    alertEl.classList.remove('show');
                    alertEl.style.transition = 'opacity 0.35s';
                    alertEl.style.opacity = '0';
                    setTimeout(() => { if (alertEl.parentNode) alertEl.parentNode.removeChild(alertEl); }, 350);
                }
            } catch (e) {
                // Ignora errores
            }
        }, timeout);
    }

    // Oculta automáticamente las alertas existentes en la página cargada
    const existingAlerts = document.querySelectorAll('.alert[role="alert"], .alert');
    existingAlerts.forEach(a => scheduleAutoHide(a, 4000));

    // Observa cambios en el DOM y oculta automáticamente las alertas insertadas después
    try {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(m => {
                m.addedNodes.forEach(node => {
                    if (!(node instanceof HTMLElement)) return;
                    if (node.matches && node.matches('.alert')) {
                        scheduleAutoHide(node);
                    }
                    const nested = node.querySelectorAll && node.querySelectorAll('.alert');
                    if (nested && nested.length) nested.forEach(n => scheduleAutoHide(n));
                });
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    } catch (e) {
    }

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Skip forms that have custom validation handlers (handled below)
        if (form.id === 'offerForm') return;
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let valid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            if (!valid) {
                e.preventDefault();
                // Mostrar mensaje de error general (si no existe ya)
                if (!form.querySelector('.alert-danger')) {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'alert alert-danger alert-dismissible fade show';
                    errorDiv.setAttribute('role', 'alert');
                    errorDiv.textContent = 'Por favor, completa todos los campos requeridos.';
                    const closeBtn = document.createElement('button');
                    closeBtn.type = 'button';
                    closeBtn.className = 'btn-close';
                    closeBtn.setAttribute('data-bs-dismiss', 'alert');
                    closeBtn.setAttribute('aria-label', 'Close');
                    errorDiv.appendChild(closeBtn);
                    form.prepend(errorDiv);
                    scheduleAutoHide(errorDiv, 4000);
                }
            }
        });
    });

    // Validación específica para el formulario de Publicar Oferta (como la del registro)
    const offerForm = document.getElementById('offerForm');
    if (offerForm) {
        const offerErrors = document.getElementById('offerFormErrors');
        const offerErrorList = document.getElementById('offerErrorList');
        const requiredFields = ['id_title', 'id_category', 'id_description', 'id_location', 'id_requirements', 'id_deadline'];

        function validateOfferForm() {
            let isValid = true;
            const errors = [];

            // limpiar previos
            offerForm.querySelectorAll('.is-invalid').forEach(f => f.classList.remove('is-invalid'));
            if (offerErrors) {
                offerErrors.classList.add('d-none');
                offerErrorList.innerHTML = '';
            }

            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field) return;
                const val = field.value ? field.value.trim() : '';
                if (!val) {
                    isValid = false;
                    field.classList.add('is-invalid');
                    const label = field.previousElementSibling ? field.previousElementSibling.textContent : fieldId;
                    errors.push(`${label} es obligatorio`);
                }
            });

            if (!isValid && offerErrors) {
                offerErrors.classList.remove('d-none');
                errors.forEach(err => {
                    const li = document.createElement('li');
                    li.textContent = err;
                    offerErrorList.appendChild(li);
                });
                // scroll to first invalid
                const first = offerForm.querySelector('.is-invalid');
                if (first) {
                    first.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    first.focus();
                }
            }

            return isValid;
        }

        offerForm.addEventListener('submit', function(e) {
            if (!validateOfferForm()) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        // remove is-invalid on input/change
        offerForm.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', function() {
                if (this.value && this.value.trim()) this.classList.remove('is-invalid');
            });
            field.addEventListener('change', function() {
                if (this.value && this.value.trim()) this.classList.remove('is-invalid');
            });
        });
    }

    // Mejorar la experiencia de búsqueda
    const searchInput = document.querySelector('input[name="search"]');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
        });
    }

    const attachmentInput = document.getElementById('id_attachment');
    const attachmentHelper = document.querySelector('.attachment-helper');
    const defaultHelperText = attachmentHelper ? attachmentHelper.textContent : 'Máx 5MB • Solo PDF';
    if (attachmentInput && attachmentHelper) {
        attachmentInput.addEventListener('change', function() {
            const file = this.files[0];
            if (!file) {
                attachmentHelper.textContent = defaultHelperText;
                return;
            }
            const maxSize = 5 * 1024 * 1024; // 5MB
            const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
            if (!isPdf) {
                alert('Solo se permiten archivos PDF.');
                this.value = '';
                attachmentHelper.textContent = defaultHelperText;
                return;
            }
            if (file.size > maxSize) {
                alert('El archivo supera el límite de 5MB.');
                this.value = '';
                attachmentHelper.textContent = defaultHelperText;
                return;
            }
            // Mostrar nombre en el helper
            attachmentHelper.textContent = file.name;
        });
    }
});