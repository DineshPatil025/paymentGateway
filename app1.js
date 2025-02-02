document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.payment-option-tabs');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Store original positions
    const originalPositions = new Map();
    tabPanes.forEach(pane => {
        originalPositions.set(pane.id, pane.parentNode);
    });

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
                // Insert pane after its tab
                tab.insertAdjacentElement('afterend', targetPane);
            }
        } else {
            // Desktop behavior
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => {
                p.classList.remove('active');
                // Reset position
                originalPositions.get(p.id).appendChild(p);
            });
            
            tab.classList.add('active');
            targetPane.classList.add('active');
        }
    };

    // Add click handlers
    tabs.forEach(tab => {
        tab.addEventListener('click', () => handleTabClick(tab));
    });

    // Handle resize
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            tabPanes.forEach(pane => {
                originalPositions.get(pane.id).appendChild(pane);
            });
        }
    });
});