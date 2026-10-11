
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       PAGE LOADER
    ========================================= */

    const loader = document.getElementById('load');

    const hideLoader = () => {
        if (loader) {
            loader.classList.add('x');
        }
    };

    window.setTimeout(hideLoader, 1200);

    window.addEventListener('load', hideLoader, { once: true });


    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================= */

    const nav = document.querySelector('.nav');
    const burger = document.querySelector('.burger');
    const menu = document.getElementById('menu');

    const updateNav = () => {
        if (nav) {
            nav.classList.toggle('s', window.scrollY > 20);
        }
    };

    updateNav();

    window.addEventListener('scroll', updateNav, {
        passive: true
    });


    /* =========================================
       MOBILE NAVIGATION MENU
    ========================================= */

    if (burger && menu) {
        burger.setAttribute('aria-expanded', 'false');

        burger.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('open');

            burger.setAttribute(
                'aria-expanded',
                String(isOpen)
            );
        });

        menu.addEventListener('click', event => {
            if (event.target.closest('a')) {
                menu.classList.remove('open');

                burger.setAttribute(
                    'aria-expanded',
                    'false'
                );
            }
        });

        document.addEventListener('click', event => {
            if (
                menu.classList.contains('open') &&
                !menu.contains(event.target) &&
                !burger.contains(event.target)
            ) {
                menu.classList.remove('open');

                burger.setAttribute(
                    'aria-expanded',
                    'false'
                );
            }
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                menu.classList.remove('open');

                burger.setAttribute(
                    'aria-expanded',
                    'false'
                );
            }
        });
    }


    /* =========================================
       SCROLL REVEAL ANIMATIONS
    ========================================= */

    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    const revealItems = document.querySelectorAll(
        '[data-reveal]'
    );

    if (
        'IntersectionObserver' in window &&
        !reduceMotion
    ) {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add('revealed');

                    revealObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -30px 0px'
            }
        );

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });
    } else {
        revealItems.forEach(item => {
            item.classList.add('revealed');
        });
    }


    /* =========================================
       CONTACT CARD SERVICE SELECTION
    ========================================= */

    document.querySelectorAll('[data-service]').forEach(
        link => {
            link.addEventListener('click', () => {
                const service = document.getElementById(
                    'service'
                );

                if (service) {
                    service.value = link.dataset.service;

                    service.dispatchEvent(
                        new Event('change', {
                            bubbles: true
                        })
                    );
                }
            });
        }
    );


    /* =========================================
       CONTACT FORM ELEMENTS
    ========================================= */

    const form = document.getElementById('cf');
    const modal = document.getElementById('md');
    const closeModal = document.getElementById('mc');


    /* =========================================
       FORM VALIDATION RULES
    ========================================= */

    const validators = {
        req: value =>
            value.trim() !== '' ||
            'This field is required.',

        email: value =>
            !value ||
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ||
            'Enter a valid email address.',

        phone: value => {
            if (!value) return true;

            const digits = value.replace(/\D/g, '');

            return (
                /^[+()\d\s.-]+$/.test(value) &&
                digits.length >= 7 &&
                digits.length <= 16
            ) || 'Enter a valid phone number.';
        }
    };


    /* =========================================
       VALIDATE INDIVIDUAL FIELD
    ========================================= */

    function validate(field) {
        const wrapper = field.closest('.field');

        if (!wrapper) return true;

        const value = field.value.trim();

        const rules = (field.dataset.v || '')
            .split(/\s+/)
            .filter(Boolean);

        let errorMessage = '';

        for (const token of rules) {
            const [rule, argument] = token.split(':');

            let result = true;

            if (rule === 'min') {
                const limit = Number(argument);

                result =
                    value.length >= limit ||
                    `Enter at least ${limit} characters.`;

            } else if (rule === 'max') {
                const limit = Number(argument);

                result =
                    value.length <= limit ||
                    `Keep this under ${limit} characters.`;

            } else if (validators[rule]) {
                result = validators[rule](value);
            }

            if (result !== true) {
                errorMessage = result;
                break;
            }
        }

        wrapper.classList.toggle(
            'bad',
            Boolean(errorMessage)
        );

        const error = wrapper.querySelector('.err');

        if (error) {
            error.textContent = errorMessage;
        }

        field.setAttribute(
            'aria-invalid',
            String(Boolean(errorMessage))
        );

        return !errorMessage;
    }


    /* =========================================
       LIVE FORM VALIDATION
    ========================================= */

    if (form) {
        const fields = [
            ...form.querySelectorAll('[data-v]')
        ];

        fields.forEach(field => {
            field.addEventListener('blur', () => {
                validate(field);
            });

            field.addEventListener('input', () => {
                if (
                    field.closest('.field')?.classList
                        .contains('bad')
                ) {
                    validate(field);
                }
            });

            field.addEventListener('change', () => {
                if (
                    field.closest('.field')?.classList
                        .contains('bad')
                ) {
                    validate(field);
                }
            });
        });


        /* =====================================
           FORM SUBMISSION
        ===================================== */

        form.addEventListener('submit', event => {
            event.preventDefault();

            const invalidFields = fields.filter(
                field => !validate(field)
            );

            if (invalidFields.length > 0) {
                invalidFields[0].focus();
                return;
            }

            /*
             * This currently displays a success modal.
             * Connect a backend or email service to
             * actually deliver the contact message.
             */

            if (
                modal &&
                typeof modal.showModal === 'function'
            ) {
                modal.showModal();
            } else {
                window.alert(
                    'Your form passed validation. ' +
                    'Email delivery is not connected yet.'
                );
            }
        });
    }


    /* =========================================
       CLOSE SUCCESS MODAL
    ========================================= */

    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.close();
        });

        modal.addEventListener('click', event => {
            if (event.target === modal) {
                modal.close();
            }
        });

        modal.addEventListener('close', () => {
            if (form) {
                form.reset();

                form.querySelectorAll('.field.bad')
                    .forEach(field => {
                        field.classList.remove('bad');
                    });

                form.querySelectorAll('[aria-invalid]')
                    .forEach(field => {
                        field.setAttribute(
                            'aria-invalid',
                            'false'
                        );
                    });

                form.querySelectorAll('.err')
                    .forEach(error => {
                        error.textContent = '';
                    });
            }
        });
    }

});
