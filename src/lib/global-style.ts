import {addGlobalStyle, css} from 'flit'
import {theme} from './theme'


addGlobalStyle(() => {
	let {mainColor, textColor, successColor, errorColor, borderRadius, lineHeight} = theme

	return css`
	html{
		color: ${theme.textColor};
		font-size: ${theme.fontSize}px;
		line-height: ${theme.lineHeight}px;
	}

	button{
		display: inline-flex;
		justify-content: center;
		height: ${lineHeight}px;
		line-height: ${lineHeight - 2}px;
		border: 1px solid ${textColor.lighten(20)};
		color: ${textColor.lighten(10)};
		border-radius: ${borderRadius}px;
		padding: 0 ${lineHeight / 3 + Math.max(0, (borderRadius - 5) / 2)}px;
		background: #fff;
		text-align: center;
		cursor: pointer;
		vertical-align: top;
		
		&:hover, &:focus{
			border-color: ${mainColor};
			color: ${mainColor};
		}

		&:focus{
			box-shadow: 0 0 3px ${mainColor};
		}
	
		&:active{
			border-color: ${mainColor.darken(10)};
			color: ${mainColor.darken(10)};
			background: ${mainColor.alpha(0.05)};
		}
	
		f-icon, f-icon-loading{
			&:first-child{
				margin-left: ${-(lineHeight / 10 - 1)}px;
				margin-right: ${lineHeight / 5 - 2}px;
			}

			&:last-child{
				margin-right: ${-(lineHeight / 10 - 1)}px;
				margin-left: ${lineHeight / 5 - 2}px;
			}
		}

		&[filled]{
			background: ${mainColor};
			border-color: ${mainColor};
			color: #fff;

			&:hover, &:focus{
				background: ${mainColor.darken(5)};
				border-color: ${mainColor.darken(5)};
			}
		
			&:active{
				background: ${mainColor.darken(10)};
				border-color: ${mainColor.darken(10)};
			}
		}

		&[borderless]{
			border: none;
			padding-left: ${lineHeight / 3}px;
			padding-right: ${lineHeight / 3}px;
			line-height: ${lineHeight}px;

			&:active{
				background: none;
			}
		}

		&[round]{
			width: ${lineHeight}px;
			border-radius: ${lineHeight / 2}px;
			padding: 0;
			font-size: 0;

			f-icon, f-icon-loading{
				margin-left: auto;
				margin-right: auto;
			}
		}
	}

	[type=text], [type=number], [type=email]{
		height: ${lineHeight}px;
		padding: 0 0 0 ${lineHeight / 5 + 2}px;
	}
	
	textarea{
		padding: ${lineHeight / 5 - 2}px ${lineHeight / 5 + 2}px;
		line-height: ${lineHeight * 0.7 + 1}px;
	}
	
	[type=text], [type=number], [type=email], textarea{
		border: none;
		box-shadow: inset 0 -1px 0 0 #888;
		background: #e5e5e5;
		
		&:focus{
			box-shadow: 0 0 3px ${mainColor};
		}
	}
	
	.f-touched{
		&.f-valid, :valid{
			box-shadow: inset 0 -2px 0 0 ${successColor};
		}

		.f-invalid, :invalid{
			box-shadow: inset 0 -2px 0 0 ${errorColor};
		}
	}

	.fade-enter, .fade-leave{
		transition: opacity 0.2s ease-out;
	}
	
	.fade-enter-from, .fade-leave-to{
		opacity: 0;
	}
	
	.fade-enter-to, .fade-leave-from{
		opacity: 1;
	}
`})