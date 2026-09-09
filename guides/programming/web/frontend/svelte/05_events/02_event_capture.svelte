<!-- 1. event handlers run during the "bubbling phase", so the event fires from within
        and goes up to the root html tag firing all events of the html tags it goes through
        and then from root html tag going back to the html tag that started all of this but
        without firing events. -->
<div onkeydown={(e) => alert(`<div> ${e.key}`)} role="presentation" >
	<input onkeydown={(e) => alert(`<input> ${e.key}`)}  />
</div>

<!-- 2. what if we want the reverse order, to fire only when it goes from the root html tag ?
        for this, we use on<event_name>capture -->
<div onkeydowncapture={(e) => alert(`<div> ${e.key}`)} >
	<input onkeydowncapture={(e) => alert(`<input> ${e.key}`)} />
</div>

<!-- 3. if an html element has both capture and non-capture event, then
        the capture one will fire first, the non-capture will fire second
     3.1 this works if both events are the same, but if they differ, the first
         will be what has more priority like non-capture click will fire anyway
         without waiting for a onkeydowncapture -->

<input
    onkeydowncapture={(e) => alert(`capture: <input> ${e.key}`)}
    onkeydown={(e) => alert(`non-capture: <input> ${e.key}`)}
 />
