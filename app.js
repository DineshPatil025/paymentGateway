document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.payment-option-tabs');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const tabContent = document.querySelector('.payment-options-details-container');
    
    // Store original positions
    let originalPositions = new Map();
    tabPanes.forEach(pane => {
        originalPositions.set(pane.id, pane.parentNode);
    });

    const isMobile = () => window.innerWidth < 768;

    const switchTab = (targetId) => {
        const clickedTab = document.querySelector(`[data-tab-target="${targetId}"]`);
        const targetPane = document.querySelector(targetId);

        if (isMobile()) {
            // Close currently open pane if any
            const openPane = document.querySelector('.tab-pane.active');
            if (openPane && openPane !== targetPane) {
                openPane.classList.remove('active');
                document.querySelector(`[data-tab-target="#${openPane.id}"]`).classList.remove('active');
            }

            // Toggle clicked pane
            if (targetPane.classList.contains('active')) {
                targetPane.classList.remove('active');
                clickedTab.classList.remove('active');
            } else {
                targetPane.classList.add('active');
                clickedTab.classList.add('active');
                // Move pane after clicked tab
                clickedTab.insertAdjacentElement('afterend', targetPane);
            }
        } else {
            // Reset to desktop view
            tabs.forEach(tab => tab.classList.remove('active'));
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                // Reset position
                originalPositions.get(pane.id).appendChild(pane);
            });
            
            clickedTab.classList.add('active');
            targetPane.classList.add('active');
        }
    };

    // Add click handlers
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tabTarget;
            switchTab(targetId);
        });
    });

    // Handle resize
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            tabPanes.forEach(pane => {
                originalPositions.get(pane.id).appendChild(pane);
            });
        }
    });

    // Initialize first tab
    switchTab('#upiPay');
});