document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.payment-option-tabs');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const detailsContainer = document.querySelector('.payment-options-details-container');
    
    const isMobile = () => window.innerWidth < 768;

    const handleTabClick = (tab) => {
        const targetId = tab.dataset.tabTarget;
        const targetPane = document.querySelector(targetId);

        if (isMobile()) {
            if (tab.classList.contains('active')) {
                // Deactivate tab and remove wrapper
                tab.classList.remove('active');
                targetPane.classList.remove('active');
                const wrapper = targetPane.closest('.payment-options-details-container');
                if (wrapper && wrapper !== detailsContainer) {
                    detailsContainer.appendChild(targetPane);
                    wrapper.remove();
                }
            } else {
                // Close other active tabs and remove their wrappers
                tabs.forEach(t => {
                    if (t.classList.contains('active')) {
                        t.classList.remove('active');
                        const pane = document.querySelector(t.dataset.tabTarget);
                        pane.classList.remove('active');
                        const wrapper = pane.closest('.payment-options-details-container');
                        if (wrapper && wrapper !== detailsContainer) {
                            detailsContainer.appendChild(pane);
                            wrapper.remove();
                        }
                    }
                });

                // Activate clicked tab
                tab.classList.add('active');
                targetPane.classList.add('active');
                
                // Create new wrapper
                const wrapper = document.createElement('div');
                wrapper.className = 'payment-options-details-container';
                wrapper.appendChild(targetPane);
                tab.insertAdjacentElement('afterend', wrapper);
            }
        } else {
            // Desktop behavior
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => {
                p.classList.remove('active');
                if (p.parentElement !== detailsContainer) {
                    detailsContainer.appendChild(p);
                }
            });
            
            tab.classList.add('active');
            targetPane.classList.add('active');
        }
    };

    // Initialize UPI tab
    const upiTab = document.querySelector('[data-tab-target="#upiPay"]');
    if (upiTab) handleTabClick(upiTab);

    // Event listeners
    tabs.forEach(tab => tab.addEventListener('click', () => handleTabClick(tab)));
    
    // Handle resize
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            tabPanes.forEach(pane => {
                const wrapper = pane.closest('.payment-options-details-container');
                if (wrapper && wrapper !== detailsContainer) {
                    detailsContainer.appendChild(pane);
                    wrapper.remove();
                }
            });
        }
    });
});