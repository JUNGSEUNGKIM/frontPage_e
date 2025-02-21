// 온보딩 페이지 테스트
describe("가로형 - 튜토리얼 페이지 이동, 언어 변경 테스트", () => {
    //TODO: 가로모드 설정해아함
    it("언어 변경", () => {
        cy.visit("http://localhost:5173/");
        let englishButton = cy.get('[data-cy="ls-selectable-en"]');
        englishButton.click();

        // 영어 적용 체크
        cy.contains("Started");

        let koreanButton = cy.get('[data-cy="ls-selectable-ko"]');
        koreanButton.click();

        // 한국어 적용 체크
        cy.contains("시작");
        // 한국어 적용 후 아래 코드 실행하면 Assertion 발생
        // cy.contains("Started");
    });

    it("튜토리얼 페이지", () => {
        cy.visit("http://localhost:5173/");
        // 시작 버튼 클릭
        let startButton = cy.get('[data-cy="ls-start-button"]');
        startButton.click();

        // tutorial page 이동 성공
        cy.url().should("contain", "tutorial");
    });
});
