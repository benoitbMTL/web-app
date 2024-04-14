#!/bin/bash

# Define the output file name
output_file="debug.txt"

# Initialize the output file and start with the tree command output
echo "====================================" > "$output_file"
tree --noreport >> "$output_file"
echo "====================================" >> "$output_file"

# Recursive function to list files and their contents if they match specific criteria
function list_files() {
    for file in "$1"/*; do
        if [ -d "$file" ]; then
            # It's a directory, call the function recursively
            list_files "$file"
        elif [ -f "$file" ]; then
            # Check if the file matches one of the specific formats or names
            if [[ "$file" =~ \.html$ || "$file" =~ \.php$ || "$file" =~ \.css$ || "$file" =~ \.json$ || "$file" =~ \.js$ || "$(basename "$file")" == "Dockerfile" || "$(basename "$file")" == "start.sh" ]]; then
                # It's a file of interest, display the path and the content
                echo "path/filename: $file" >> "$output_file"
                echo "====================================" >> "$output_file"
                cat "$file" >> "$output_file"  # Append the content of the file
                echo "====================================" >> "$output_file"
            fi
        fi
    done
}

# Call the function with the current directory
list_files "."

# Display the path of the output file
echo "The file information has been saved in: $output_file"
