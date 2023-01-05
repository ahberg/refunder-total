// global CSS
import globalCss from './style.css';

import { getOrders } from './orders';

document.head.append(VM.m(<style>{globalCss}</style>));
const handleClick = () => {
  const CSV = getOrders();
};

function ButtonEnable() {
  return (
    <>
      <div class="max-w-xl mx-auto">Custom features</div>
      <div class="text-center">
        <button
          onClick={handleClick}
          class="btn ucr-button-enable ucr-btn-dark font-bold rounded-full px-16 py-3"
        >
          Download CSV
        </button>
      </div>
    </>
  );
}

const panel = VM.getPanel({
  content: <ButtonEnable />,
  theme: 'dark',
  style: globalCss,
});
panel.wrapper.style.top = '100px';
panel.setMovable(true);
panel.show();
