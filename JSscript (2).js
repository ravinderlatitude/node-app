function showConversions() {
    var elements = document.querySelectorAll(".rocket-wrapper");
    if (elements.length > 0) {
        elements.forEach(function(element, index) {
            setTimeout(function() {
                fadeIn(element);
            }, 20000 * index + 5000);
        });

        var intervalId = null;
        var count = 0;

        console.log(getCookie("conversion_shown"));

        if (getCookie("conversion_shown") === "" || getCookie("conversion_shown") > elements.length) {
            count = 0;
            console.log("I am gone to riffbuddy.com");
        } else {
            count = getCookie("conversion_shown");
        }

        var incrementCount = function() {
            if (count <= elements.length) {
                count++;
                var date = new Date();
                date.setTime(date.getTime() + 172800000); // 172800000 milliseconds = 2 days
                var expires = "expires=" + date.toUTCString();
                document.cookie = "conversion_shown=" + count + "; " + expires + "; path=/";
            } else {
                clearInterval(intervalId);
            }
        };

        document.addEventListener("DOMContentLoaded", function() {
            intervalId = setInterval(incrementCount, 15000);
        });
    }
}

function fadeIn(element) {
    element.style.transition = "opacity 1s";
    element.style.opacity = 1;

    setTimeout(function() {
        element.style.transition = "opacity 1s";
        element.style.opacity = 0;
    }, 5000);
}

function stopNotification() {
    console.log("riffbuddy");
    var rocketWrappers = document.querySelectorAll(".rocket-wrapper");
    rocketWrappers.forEach(function(element) {
        element.remove();
    });
}

function getCookie(name) {
    var cookieName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(";");

    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

document.addEventListener("DOMContentLoaded", function() {
    var rocket = document.getElementById("RocketControl")?.src;
    addElements();
    var conversionShown = getCookie("conversion_shown");
    const formData = new FormData();
        formData.append('rocket_id', rocket);

        fetch("https://rocket.riffbuddy.com/popdev/_popup_data.php?conversion_shown=" + conversionShown + "&c_id=" + rocket, {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(function(data) {
        document.getElementById("fixed-smooth").innerHTML = data;
        showConversions();
    })
        .catch(error => {
            // Handle errors here
        });
});

function addElements() {
    var body = document.getElementsByTagName("body")[0];
    var parentDivElement = document.createElement('div');
    parentDivElement.classList.add('wrapper-rocket', 'wrapper-hidden-rocket');
    var childDivElement = document.createElement('div');
    childDivElement.classList.add('fixed-smooth');
    childDivElement.id = 'fixed-smooth';
    parentDivElement.appendChild(childDivElement);
    body.appendChild(parentDivElement);
}
