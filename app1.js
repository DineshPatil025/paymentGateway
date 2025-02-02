document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.payment-option-tabs');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const detailsContainer = document.querySelector('.payment-options-details-container');
    
    const isMobile = () => window.innerWidth < 768;

    const handleTabClick = (tab) => {
        const targetId = tab.dataset.tabTarget;
        const targetPane = document.querySelector(targetId);

        if (isMobile()) {
            // Close other open panes
            tabPanes.forEach(pane => {
                if (pane !== targetPane && pane.classList.contains('active')) {
                    pane.classList.remove('active');
                    const associatedTab = document.querySelector(`[data-tab-target="#${pane.id}"]`);
                    associatedTab.classList.remove('active');
                }
            });

            // Toggle clicked pane
            if (targetPane.classList.contains('active')) {
                targetPane.classList.remove('active');
                tab.classList.remove('active');
            } else {
                targetPane.classList.add('active');
                tab.classList.add('active');
                
                // Create wrapper with original container class
                const wrapper = document.createElement('div');
                wrapper.className = 'payment-options-details-container';
                wrapper.appendChild(targetPane);
                
                // Insert after tab
                tab.insertAdjacentElement('afterend', wrapper);
            }
        } else {
            // Desktop behavior
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => {
                p.classList.remove('active');
                detailsContainer.appendChild(p);
            });
            
            tab.classList.add('active');
            targetPane.classList.add('active');
        }
    };

    // Initialize UPI tab as active
    const upiTab = document.querySelector('[data-tab-target="#upiPay"]');
    if (upiTab) {
        handleTabClick(upiTab);
    }

    // Add click handlers
    tabs.forEach(tab => {
        tab.addEventListener('click', () => handleTabClick(tab));
    });

    // Handle resize
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            tabPanes.forEach(pane => {
                detailsContainer.appendChild(pane);
            });
        }
    });
});