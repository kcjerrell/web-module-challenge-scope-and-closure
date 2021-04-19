function createBase(n) {
	return (x) => x + n;
}

var addSix = createBase(6);
console.log(addSix(10)); // returns 16
console.log(addSix(21)); // returns 27

/*
I'm looking through various articles/posts on the web about the differences between FP and OOP, and besides the
recycling of the same 5 points used everywhere, one thing I noticed is that there aren't a lot of /practical/
examples of the differences between the two paradigms. So rather than rehash the same differences, using vague-ish
terms like "imperative" or "declarative" that don't really mean much on their own, I'll try and give some examples.

But who knows, I might stall out after the first one. We'll see. Also, it's important to remember that most of the
popular languages now-a-days are multi-paradigm: they can use functional patterns when appropriate, even within
an object-oriented framework.

One area where FP has the advantage over OOP/Imperative style is extracting/filtering data out of a larger set.
Here's an example from last week's sprint challenge:
*/

const artistData = [/*...*/];

function lotsOfArt(array) {
  const prolific = [];

	for (let i = 0; i < array.length; i++) {
    if (a.paintings > 100)
      prolific.push(a.name);
  }
  return prolific;
}

const prolificArtists = lotsOfArt(artistData);

/*
Although this doesn't really touch on OOP, the imperative style is typical of the paradigm. It gives instructions to
iteratate through an array of artist data, check if they've painted over x paintings, and add the artist's name to
the return array.

Functional programming, however, would favor /declaring/ what the desired list is:
*/

const artistData = [/*...*/];

const prolificArtists = artists.filter(a => a.paintings > 100).map(a => a.name);

/*
Here, the funtional style is not only more straight-forward and easier to understand, but by writing less code you have
fewer bugs. In some language, the functional style is even more straightforward than in js:

--C#--
var prolificArtists = from artist in artistData
											where artist.paintings > 100
											select artist.name;

--Python--
prolific_artists = [ a.name for a in artists_data if a.paintings > 100 ]


One area where OOP has the advantage is inheritance/polymorphism. I've been hacking together an app for controlling my
LED smart lights. This type of problem is perfectly suited for OOP: Lights are objects! But where this paradigm really
has advantages is when dealing with different types of lights or different methods of commincating with them.

Each light has 5 properties: Power, Mode (white or color), Brightness, ColorTemperature, and Color. The options for
these properties doesn't change, but the methods for updating/changing them are varied. Rather than rewrite the Light
class for each device type, protocol, or library I want to use, the properties accessors themselves can be swapped out
for different implementations.

    public interface IDeviceProperty<T> where T : IEquatable<T>
    {
        public T Value { get; }
        public Task Set(T value);
        public Task Update();

        public event PropertyChangedEventHandler Updated;
    }

		// cut out everything but the relevant bits
		public class Light
    {
				protected IDeviceProperty<bool> power;
        protected IDeviceProperty<HSV> color;

        public bool Power { get => power.Value; set => power.Set(value); }
        public HSV Color { get => color.Value; set => color.Set(value); }
		}

the IDeviceProperty objects can be swapped out with any other implementation (currently one uses HTTP to access a REST
API for controlling lights over wifi, another uses UDP, if I ever find a library for .NET that actually works, another
implementation can be written for that...)

The Light class, and anything that uses it (like a GUI, a task scheduler, or a daemon that flashes a light when e-mail
is received), doesn't have to be rewritten or modified, even though different methods are used to communicate with the
device itself. It can be reused for completely different devices.

This encapsulation is one of OOP's biggest strengths.

Functional programming and OOP are just different problem solving strategies that any programmer should be familiar
with. Both have their places, and both have their weakness.
*/
