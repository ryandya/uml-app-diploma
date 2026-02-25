function ScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

export default function TopBtn() {
    return (
        <button onClick={ScrollToTop} className="to_top_btn">
            ↑
        </button>
    );
}