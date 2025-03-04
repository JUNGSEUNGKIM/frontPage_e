// only available on mobile

export default function MobileLoginPage() {
    const isMobile = window.innerWidth < 500;
    return (
        <div className="">
            {isMobile ? <MobileLoginContent /> : <UnavailableContent />}
        </div>
    );
}

function MobileLoginContent() {
    return (
        <div>
            <p>Login</p>
        </div>
    );
}

function UnavailableContent() {
    return (
        <div>
            <p>모바일에서 로그인을 시도해주세요</p>
        </div>
    );
}
