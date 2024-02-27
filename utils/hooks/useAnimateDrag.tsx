import React from 'react'

const useAnimateDragHorizontal = (entity: string) => {

    React.useEffect(() => {
        const folios = document.querySelector(entity) as HTMLElement;
        folios.style.cursor = 'grab';

        let pos = { top: 0, left: 0, x: 0, y: 0 };

        const mouseDownHandler = function (e: any) {
            folios.style.cursor = 'grabbing';
            folios!.style.userSelect = 'none';

            pos = {
                left: folios.scrollLeft,
                top: folios.scrollTop,
                // Get the current mouse position
                x: e.clientX,
                y: e.clientY,
            };

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };

        const mouseMoveHandler = function (e: any) {
            // How far the mouse has been moved
            const dx = e.clientX - pos.x;
            const dy = e.clientY - pos.y;

            // Scroll the element
            folios.scrollTop = pos.top - dy;
            folios.scrollLeft = pos.left - dx;
        };

        const mouseUpHandler = function () {
            folios.style.cursor = 'grab';
            folios.style.removeProperty('user-select');

            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        // Attach the handler
        folios.addEventListener('mousedown', mouseDownHandler);

    }, [])
    return;
}

export default useAnimateDragHorizontal