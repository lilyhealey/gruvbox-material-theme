#----------------------
# set the shell prompt
#----------------------

reset="\e[0m";
black="\e[30m";
red="\e[31m";
green="\e[32m";
yellow="\e[33m";
blue="\e[34m";
purple="\e[35m";
cyan="\e[36m"; # reserved for orange
ltgray="\e[37m";
dkgray="\e[90m";
bred="\e[91m";
bgreen="\e[92m";
byellow="\e[93m";
bblue="\e[94m";
bpurple="\e[95m";
bcyan="\e[96m"; # reserved for orange
white="\e[97m";

# see the bash man page for a description of special characters.
# colours
ereset="\[\e[0m\]";
eblack="\[\e[30m\]";
ered="\[\e[31m\]";
egreen="\[\e[32m\]";
eyellow="\[\e[33m\]";
eblue="\[\e[34m\]";
epurple="\[\e[35m\]";
ecyan="\[\e[36m\]"; # reserved for orange
eltgray="\[\e[37m\]";
edkgray="\[\e[90m\]";
ebred="\[\e[91m\]";
ebgreen="\[\e[92m\]";
ebyellow="\[\e[93m\]";
ebblue="\[\e[94m\]";
ebpurple="\[\e[95m\]";
ebcyan="\[\e[96m\]"; # reserved for orange
ewhite="\[\e[97m\]";

prompt_git() {
  local s='';
  local branchName='';

  # Check if the current directory is in a Git repository.
  if [ $(git rev-parse --is-inside-work-tree &>/dev/null; echo "${?}") == '0' ]; then

    # check if the current directory is in .git before running git checks
    if [ "$(git rev-parse --is-inside-git-dir 2> /dev/null)" == 'false' ]; then

      # Ensure the index is up to date.
      git update-index --really-refresh -q &>/dev/null;

      # Check for uncommitted changes in the index.
      if ! $(git diff --quiet --ignore-submodules --cached); then
        s+="${bgreen}";
        s+="+";
        s+="${reset}";
      fi;

      # Check for unstaged changes.
      if ! $(git diff-files --quiet --ignore-submodules --); then
        s+="${bred}";
        s+="!";
        s+="${reset}";
      fi;

      # Check for untracked files.
      if [ -n "$(git ls-files --others --exclude-standard)" ]; then
        s+="${byellow}";
        s+='?';
        s+="${reset}";
      fi;

      # Check for stashed files.
      if $(git rev-parse --verify refs/stash &>/dev/null); then
        s+="${bblue}";
        s+='$';
        s+="${reset}";
      fi;

    fi;

    # Get the short symbolic ref.
    # If HEAD isn’t a symbolic ref, get the short SHA for the latest commit
    # Otherwise, just give up.
    branchName="$(git symbolic-ref --quiet --short HEAD 2> /dev/null || \
      git rev-parse --short HEAD 2> /dev/null || \
      echo '(unknown)')";

    [ -n "${s}" ] && s="${black}[${s}${black}]${reset}";

    printf "\n${1}${branchName} ${s}\n";
    # printf "\n${1}${branchName}${s}"
  else
    return;
  fi;
}

# date-time
lt="\D{%H:%M. %d %b}";
st="\t";
ldt="\D{%d %b %Y}";
sdt="\D{%d %b}";
wday="\D{%a}";

# other prompt things
# \h	the hostname up to the first '.'
# \H 	the hostname

# 505. lhealey@TNE-lhealey-4852:~/Documents
# $ 

# \!  the history number of this command
# PS1="${edkgray}\!. ";

# \u  the username of the current user
# \h  the hostname up to the first `.'
PS1="${edkgray}\u@"

# PS1+="${ereset}@"

PS1+="${ebpurple}\h";

# plaintext colon
PS1+="${ereset}:";

# \w  the current working directory; with $HOME abbreviated with a tilde
PS1+="${ebblue}\w";

# Git repository details
PS1+="\$(prompt_git \"${eblack}on ${eltgray}\" \"${ered}\")";
# PS1+="\$(prompt_git \"\[${white}\]on \[${ltgray}\]\")";

# a literal $
PS1+="${ereset}\n\$ ";

export PS1;

PS2="..";
export PS2;
