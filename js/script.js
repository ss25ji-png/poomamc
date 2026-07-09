const mainContainer = document.getElementById('main-container');
const mainSection = document.getElementById('main-section');

const trigger = document.getElementById('horizontal-trigger');
const slides = document.getElementById('slides');
const slide1 = document.querySelector('.slide-1'); 
const slide2 = document.querySelector('.slide-2'); 
const slide3 = document.querySelector('.slide-3'); 
const slide4 = document.querySelector('.slide-4'); 

// 카운팅 진행 상태 플래그
let isPoomCountingStarted = false; 

window.addEventListener('scroll', () => {
    
  
    if (window.innerWidth <= 1024) {
      
        if (mainSection) {
            mainSection.style.transform = 'none';
            mainSection.style.borderRadius = '0px';
        }
        
        if (slides) {
            slides.style.transition = 'none'; 
            slides.style.transform = 'none';
        }
        
        if (slide1) slide1.classList.add('active');
        if (slide2) slide2.classList.add('active');
        if (slide3) slide3.classList.add('active');
        if (slide4) slide4.classList.add('active');

        if (!isPoomCountingStarted) {
            const triggerRect = trigger.getBoundingClientRect();
            if (triggerRect.top < window.innerHeight && triggerRect.bottom > 0) {
                runPoomCountUp();
            }
        }
        
       
        return; 
    }

    // =================================================================

    const scrollTop = window.pageYOffset;
    
    /* 1. 메인 화면 제어 */
    const mainMaxScroll = mainContainer.clientHeight - window.innerHeight;
    let mainScrollPercent = scrollTop / mainMaxScroll;
    if (mainScrollPercent > 1) mainScrollPercent = 1;
    if (mainScrollPercent < 0) mainScrollPercent = 0;

    const scaleValue = 1; 
    const borderRadiusValue = mainScrollPercent * 50; 

    let translateY = 0;
    if (mainScrollPercent > 0.6) {
        translateY = (mainScrollPercent - 0.6) * -150; 
    }

    mainSection.style.transform = `scale(${scaleValue}) translateY(${translateY}px)`;
    mainSection.style.borderRadius = `${borderRadiusValue}px`;


    const triggerTop = trigger.offsetTop;

    if (scrollTop >= triggerTop) {
        const offset = scrollTop - triggerTop;
        const maxScroll = trigger.clientHeight - window.innerHeight;
        
        let scrollPercent = offset / maxScroll;
        if (scrollPercent > 1) scrollPercent = 1;
        if (scrollPercent < 0) scrollPercent = 0;

        let moveX = 0;
        if (scrollPercent < 0.02) {
            moveX = 0;
        } else if (scrollPercent > 0.98) {
            moveX = 300;
        } else {
            const adjustedPercent = (scrollPercent - 0.02) / 0.96;
            moveX = adjustedPercent * 300; 
        }

        let snapX = 0;
        if (moveX < 50) {
            snapX = 0;
        } else if (moveX >= 50 && moveX < 150) {
            snapX = 100;
        } else if (moveX >= 150 && moveX < 250) {
            snapX = 200;
        } else {
            snapX = 300;
        }

        slides.style.transition = 'transform 0.4s ease-out'; 
        slides.style.transform = `translateX(-${snapX}vw)`;

        if (snapX === 0) {
            slide1.classList.add('active');
            if (!isPoomCountingStarted) {
                runPoomCountUp();
            }
        } else {
            slide1.classList.remove('active');
            if (isPoomCountingStarted) {
                resetPoomCounter();
            }
        }

        if (snapX === 100) {
            slide2.classList.add('active');
        } else {
            slide2.classList.remove('active');
        }

        if (snapX === 200) {
            slide3.classList.add('active');
        } else {
            slide3.classList.remove('active');
        }

        if (snapX === 300) {
            slide4.classList.add('active');
        } else {
            slide4.classList.remove('active');
        }

    } else {
        slides.style.transition = 'none'; 
        slides.style.transform = 'translateX(0vw)';
        slide1.classList.add('active'); 
        slide2.classList.remove('active');
        slide3.classList.remove('active');
        slide4.classList.remove('active'); 
        
        if (isPoomCountingStarted) {
            resetPoomCounter();
        }
    }

    const section5 = document.getElementById('5section');
    if (section5) {
        const section5Top = section5.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.75; 

        if (section5Top < triggerPoint) {
            section5.classList.add('active');
        } else {
            section5.classList.remove('active');
        }
    }
});
////햄버거
document.addEventListener('DOMContentLoaded', () => {
    const menuTrigger = document.getElementById('menuTrigger');
    const gnbOverlay = document.getElementById('gnbOverlay');
    const gnbLinks = document.querySelectorAll('.gnb_list a');

    const toggleMenu = () => {
        menuTrigger.classList.toggle('active');
        gnbOverlay.classList.toggle('open');
        
        if (gnbOverlay.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    menuTrigger.addEventListener('click', toggleMenu);

    gnbLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (gnbOverlay.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    const sloganContent = document.querySelector('.hero_slogan_content');
    if (sloganContent) {
        setTimeout(() => {
            sloganContent.classList.add('active');
        }, 300); 
    }
});


function runPoomCountUp() {
    isPoomCountingStarted = true; 

    const items = document.querySelectorAll('.poom-counter-item');
    const numbers = document.querySelectorAll('.poom-counter-number');

    items.forEach(item => item.classList.add('poom-active'));

    numbers.forEach(numElement => {
        const target = parseInt(numElement.getAttribute('data-target'), 10);
        if (isNaN(target)) return; 

        const duration = 1200; 
        const startTime = performance.now();

        function step(now) {
            if (!isPoomCountingStarted) return; 

            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutCube = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOutCube * target);

            numElement.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                numElement.textContent = target.toLocaleString();
            }
        }
        requestAnimationFrame(step);
    });
}

function resetPoomCounter() {
    isPoomCountingStarted = false; 

    const items = document.querySelectorAll('.poom-counter-item');
    const numbers = document.querySelectorAll('.poom-counter-number');

    items.forEach(item => item.classList.remove('poom-active'));

    numbers.forEach(numElement => {
        numElement.textContent = "0";
    });
}


//gnb 스페셜
document.addEventListener('DOMContentLoaded', () => {
    const specialBtn = document.querySelector('.gnb-special-btn');
    const triggerSection = document.getElementById('horizontal-trigger');

    if (specialBtn && triggerSection) {
        specialBtn.addEventListener('click', (e) => {
            e.preventDefault(); 

            const triggerTop = triggerSection.offsetTop;
            
            const maxScroll = triggerSection.clientHeight - window.innerHeight;

            const slide2Progress = 100 / 300; 

            const targetScrollY = triggerTop + (maxScroll * slide2Progress);

            window.scrollTo({
                top: targetScrollY,
                behavior: 'smooth' 
            });
        });
    }
});
//gnb 섹션5
document.addEventListener('DOMContentLoaded', () => {
    const deptBtn = document.querySelector('.gnb-dept-btn');
    const deptSection = document.getElementById('5section');

    if (deptBtn && deptSection) {
        deptBtn.addEventListener('click', (e) => {
            e.preventDefault(); 

            const sectionRect = deptSection.getBoundingClientRect();
            
            const absoluteTop = window.pageYOffset + sectionRect.top;

          
            const offsetSpacing = 100; 
            const targetScrollY = absoluteTop - offsetSpacing;

           
            window.scrollTo({
                top: targetScrollY,
                behavior: 'smooth'
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const footerSection = document.getElementById('footer-section');
    const rightPanel = document.getElementById('rightExpandedPanel');
    const track = document.getElementById('infiniteTrack');
    
    let isPanelOpen = false;
    let isAnimating = false;
    let isFooterInView = false; 

    // =================================================================
    //  마지막 창 - 스크롤 감시 및 가로 슬라이드 제어
    // =================================================================
    if (footerSection && rightPanel) {
       
        const observerOptions = {
            root: null,
            rootMargin: "-5% 0px -5% 0px", 
            threshold: 0.6 
        };

        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isFooterInView = entry.isIntersecting;
                
                if (!entry.isIntersecting && isPanelOpen) {
                    rightPanel.classList.remove('open');
                    isPanelOpen = false;
                }
            });
        }, observerOptions);

        footerObserver.observe(footerSection);

        // 2. 마우스 휠 이벤트 처리
        window.addEventListener('wheel', (e) => {
            if (isFooterInView) {
                
                if (e.deltaY > 0 && !isPanelOpen && !isAnimating) {
                    e.preventDefault(); 
                    isAnimating = true;
                    
                    rightPanel.classList.add('open'); 
                    isPanelOpen = true;

                    setTimeout(() => { isAnimating = false; }, 700);
                    return; 
                } 
                else if (e.deltaY > 0 && isPanelOpen && !isAnimating) {
                    return; 
                }
                
                else if (e.deltaY < 0 && isPanelOpen && !isAnimating) {
                    e.preventDefault(); 
                    isAnimating = true;
                    
                    rightPanel.classList.remove('open'); 
                    isPanelOpen = false;

                    setTimeout(() => { isAnimating = false; }, 700);
                    return; 
                }
                
                
                if (isPanelOpen || isAnimating) {
                    e.preventDefault();
                }
            }
        }, { passive: false });
    }
});
    ///


//가로 슬라이드 스크롤 자유
     // 2. 마우스 휠 이벤트 처리 (글자가 다 안 올라와도 즉시 스크롤 가능)
        window.addEventListener('wheel', (e) => {
            if (isFooterInView) {
                
                // [닫힌 상태] 휠을 아래로 내리면 -> 오른쪽 창을 즉시 엽니다.
                // (isAnimating 조건을 제거하여 글자가 나오는 중에도 휠 입력이 먹히도록 합니다)
                if (e.deltaY > 0 && !isPanelOpen) {
                    e.preventDefault(); 
                    isAnimating = true;
                    
                    rightPanel.classList.add('open'); 
                    isPanelOpen = true;

                    setTimeout(() => { isAnimating = false; }, 400); // 대기 시간도 400ms로 단축
                    return; 
                } 
                // [열린 상태] 휠을 아래로 더 내릴 때 -> 글자가 다 안 나왔어도 무조건 밑으로 즉시 스크롤 다운
                else if (e.deltaY > 0 && isPanelOpen) {
                    // e.preventDefault()가 없으므로 휠을 내리는 순간 화면이 바로 밑으로 내려갑니다.
                    return; 
                }
                
                // [열린 상태] 화면이 이 섹션에 머물러 있으면서 휠을 위로 올릴 때 -> 오른쪽 창을 즉시 닫습니다.
                else if (e.deltaY < 0 && isPanelOpen) {
                    const rect = footerSection.getBoundingClientRect();
                    if (rect.top >= -50) {
                        e.preventDefault(); 
                        isAnimating = true;
                        
                        rightPanel.classList.remove('open'); 
                        isPanelOpen = false;

                        setTimeout(() => { isAnimating = false; }, 400); // 대기 시간 단축
                        return; 
                    }
                }
            }
        }, { passive: false });
  //
    // ⚡ QUICK 버튼 클릭 창을 여닫는 함수
function toggleQuickMenu() {
    const quickBar = document.getElementById('quickMenuBar');
    if (quickBar) {
        quickBar.classList.toggle('hide');
    }
}



//마우스
// =============================

const cursorDots = document.querySelectorAll('.cursor-dot');

if (cursorDots.length > 0) {
    let mouseX = 0;
    let mouseY = 0;

    let dotsCoords = [];
    cursorDots.forEach(() => {
        dotsCoords.push({ x: 0, y: 0 });
    });

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function renderMultiCursor() {
        let targetX = mouseX;
        let targetY = mouseY;

        cursorDots.forEach((dot, index) => {
            let coords = dotsCoords[index];

            coords.x += (targetX - coords.x) * 0.16;
            coords.y += (targetY - coords.y) * 0.16;

            dot.style.transform = `translate3d(${coords.x - 16}px, ${coords.y - 16}px, 0)`;

            targetX = coords.x;
            targetY = coords.y;
        });

        requestAnimationFrame(renderMultiCursor);
    }

    requestAnimationFrame(renderMultiCursor);

    // ===============================================================
    // 발바닥
    // ===============================================================
    function initCursorHoverEvents() {
        const interactiveElements = document.querySelectorAll(`
            a, button, 
            .card-container, .bubble-card, 
            .quick-item, .quick-toggle-btn, .quick-top-btn,
            .info-box, [onclick]
        `);

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDots.forEach(dot => dot.classList.add('hover'));
            });

            element.addEventListener('mouseleave', () => {
                cursorDots.forEach(dot => dot.classList.remove('hover'));
            });
        });
    }

    // 호버 이벤트 시스템 즉시 가동
    initCursorHoverEvents();

    setTimeout(initCursorHoverEvents, 500);

    // 화면 이탈 시 투명화 장치
    document.addEventListener('mouseleave', () => {
        cursorDots.forEach(dot => dot.style.opacity = '0');
    });
    document.addEventListener('mouseenter', () => {
        cursorDots.forEach((dot, index) => {
            const opacities = [1, 0.8, 0.6, 0.4, 0.2];
            dot.style.opacity = dot.classList.contains('hover') ? opacities[index] : opacities[index];
        });
    });
}

//팝업// 1. 웹페이지가 열리자마자 바로 팝업 체크
document.addEventListener("DOMContentLoaded", function () {
    // 'hideCheckPopup' 이라는 일일 차단 쿠키가 없으면 팝업창 온(Flex)
    if (getCookie("hideCheckPopup") !== "true") {
        document.getElementById("mainPopup").style.display = "flex";
    }
});

// 2. 🔥 [수정] 팝업창 닫기 액션 작동 처리 (스르륵 효과 반영)
function closePopup() {
    // 오늘 하루 보지 않기가 체크되어 있으면 1일 만료 쿠키 구워버리기
    if (document.getElementById("dayCheck").checked) {
        setCookie("hideCheckPopup", "true", 1);
    }
    
    let popup = document.getElementById("mainPopup");
    
    // 💡 스르륵 닫히는 애니메이션 클래스를 주입합니다.
    popup.classList.add("hide");
    
    // 💡 애니메이션이 작동하는 시간(0.3초 = 300ms) 동안 기다린 후 완전히 display: none 처리합니다.
    setTimeout(function() {
        popup.style.display = "none";
        popup.classList.remove("hide"); // 다음 오픈을 위해 클래스 리셋
    }, 300);
}

// 🍪 쿠키 굽기 모듈
function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// 🍪 쿠키 확인용 리더 모듈
function getCookie(name) {
    let cookieName = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return "";
}
