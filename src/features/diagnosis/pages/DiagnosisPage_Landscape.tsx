
/**
 * TEMP DEBUG
 * 
 * Sample page for testing landscape mode sidebars.
 */

import DiagnosisSidebar from "../components/DiagnosisSidebar";

export default function DiagnosisPage_Landscape() {

    return (
        <div 
            className="w-screen h-screen"
            style={{
                backgroundImage: `url(https://picsum.photos/1600/900)`,
                backgroundSize: 'cover', 
                backgroundPosition: 'center' ,
                backgroundAttachment: 'fixed',
            }}
        >

            <DiagnosisSidebar />

        </div>
    );
}