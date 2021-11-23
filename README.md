# Temperatur conversion variable for use in [Firebot](https://github.com/crowbartools/Firebot).

#### Example:

Create a command !temp with a Chat Effect that contains:
`$arg[1]°$arg[2] converts to $tempConverter[$arg[1], $arg[2]]`

Then if you post a message like this `!temp 25 C` in chat, the bot will then reply with `25°C converts to 77.00°F` in chat.

Based of off:
### [Starter Firebot Custom Script in Typescript](https://github.com/crowbartools/firebot-custom-script-starter)
