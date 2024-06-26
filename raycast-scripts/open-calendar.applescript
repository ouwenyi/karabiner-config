#!/usr/bin/osascript

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Open Google Calendar in Arc
# @raycast.mode compact

# Optional parameters:
# @raycast.icon images/google-calendar-logo.svg
# @raycast.packageName Keyboard Shortcut Utils

# Documentation:
# @raycast.description Opens the private google calendar
# @raycast.author LBBO
# @raycast.authorURL https://raycast.com/LBBO

tell application "Arc"
	if (count of windows) is 0 then
		make new window
	end if
	
	tell first window
		set allTabs to properties of every tab
		set tabsCount to count of allTabs
		repeat with i from 1 to tabsCount
			set _tab to item i of allTabs
			if get title of _tab is "RAYCAST_TARGET_CALENDAR_TAB" then
				tell tab i
					select
					activate
					return
				end tell
			end if
		end repeat
	end tell
end tell
